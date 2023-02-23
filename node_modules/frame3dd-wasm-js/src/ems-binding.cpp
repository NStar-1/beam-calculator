#include <emscripten/bind.h>
extern "C" {

#include "../frame3dd/src/compat_types.h"
#include "../frame3dd/src/types.h"
#include "../frame3dd/src/core.h"

InputScope iscope;
ResultScope rs;
Material material;
Profile profile;
SolverContext ctx = {
  .rms_resid = 1.0,
  .error = 1.0,
  .ok = 1,
  .iter = 0
};

uint8_t init(const uint16_t nN, const uint16_t nE) {
  IS_set_nN(&iscope, nN);
  IS_set_nR(&iscope, 1);
  IS_set_nE(&iscope, nE);
  IS_set_nL(&iscope, 1);
  return 0;
}

void set_point(uint16_t id, double point[3], uint8_t is_fixed) {
  iscope.xyz[id].x = point[0];
  iscope.xyz[id].y = point[1];
  iscope.xyz[id].z = point[2];
  iscope.rj[id] = 0;
  for (uint8_t i = 1; i <= 6; i++) {
      iscope.r[(id - 1) * 6 + i] = is_fixed;
  }
}

uint8_t init_reactions() {
  Error *error = NULL;
  error = IS_init_reactions(&iscope);
  if (error != NULL) return error->code;
  return 0;
}

void set_material(const Material mat) {
  material = mat;
}

void set_profile(const Profile prof) {
  profile = prof;
}

void set_element(uint16_t id, uint16_t start_id, uint16_t end_id) {
  iscope.Ax[id]  = profile.Ax;
  iscope.Asy[id] = profile.Asy;
  iscope.Asz[id] = profile.Asz;
  iscope.Jx[id]  = profile.Jx;
  iscope.Iy[id]  = profile.Iy;
  iscope.Iz[id]  = profile.Iz;
  iscope.E[id] = material.E;
  iscope.G[id] = material.G;
  iscope.d[id] = material.density;
  iscope.N1[id] = start_id;
  iscope.N2[id] = end_id;
}

uint8_t init_length() {
  Error *error = NULL;

  error = IS_init_elements_length(&iscope);
  if (error != NULL)
  return error->code;
  return 0;
}

void set_gravity(float gX, float gY, float gZ) {
  // TODO for loop?
  // 1 for load case #1
  iscope.gX[1] = gX;
  iscope.gX[1] = gY;
  iscope.gX[1] = gZ;
  IS_init_eqF_mech(&iscope, 1);
}

void init_point_loads(uint8_t number) {
  // 1 for load case #1
  iscope.nF[1] = number;
}

void set_point_load(uint8_t id, double axial[3], double rotational[3]) {
  // 1 for load case #1
  const uint16_t ofst = 6 * (id - 1);
  iscope.F_mech[1][ofst + 1] = axial[0];
  iscope.F_mech[1][ofst + 2] = axial[1];
  iscope.F_mech[1][ofst + 3] = axial[2];
  iscope.F_mech[1][ofst + 4] = rotational[0];
  iscope.F_mech[1][ofst + 5] = rotational[1];
  iscope.F_mech[1][ofst + 6] = rotational[2];
}

void write_rs() {
  FILE *fd;
  fd = fopen("D", "wb");
  fwrite(rs.D + 1, sizeof(*rs.D), iscope.DoF, fd);
  fclose(fd);

  fd = fopen("R", "wb");
  fwrite(rs.R + 1, sizeof(*rs.R), iscope.DoF, fd);
  fclose(fd);

  fd = fopen("Q", "wb");
  for (uint16_t i = 1 ; i <= iscope.nE; i++)
  fwrite(rs.Q[i] + 1, sizeof(*rs.R), 12, fd);
  fclose(fd);
}

uint8_t solve_model() {
  const RuntimeArgs args = {
      .verbose = 1,
      .axial_sign = 1,
      .overrides = { -1 }
  };

  // TODO: should be derived from args/overrides
  iscope.anlyz = 1;
  iscope.lump = 1;
  iscope.geom = 1;
  iscope.pan = 1;
  iscope.scale = 2.5;
  iscope.dx = 10;
  iscope.exagg_static = 5;
  iscope.exagg_modal = 10;
  iscope.tol = 1.0e-9;
  RS_init_for_IS(&rs, &iscope);
  printf("\nD1 = ");

  // 1 for Load Case #1
  solve(iscope, args, ctx, rs, 1);

  printf("\nD = ");
  for (uint16_t i = 1; i <= 12; i++) {
      printf("%.2f ", rs.D[i]);
  }

  write_rs();

  return 0;
}

SolverContext get_context() {
  return ctx;
}
} // extern c

using namespace emscripten;

EMSCRIPTEN_BINDINGS(frame3dd_solve_binding) {
  value_object<SolverContext>("SolverContext")
    .field("rms_resid", &SolverContext::rms_resid)
    .field("error", &SolverContext::error)
    .field("ok", &SolverContext::ok)
    .field("iter", &SolverContext::iter)
    ;

  value_object<Profile>("Profile")
    .field("Ax", &Profile::Ax)
    .field("Asy", &Profile::Asy)
    .field("Asz", &Profile::Asz)
    .field("Jx", &Profile::Jx)
    .field("Iy", &Profile::Iy)
    .field("Iz", &Profile::Iz)
    ;

  value_object<Material>("Material")
    .field("density", &Material::density)
    .field("E", &Material::E)
    .field("G", &Material::G)
    ;
           
  function("get_context", &get_context);
  function("init", &init);
  function("set_point", &set_point, allow_raw_pointers());
  function("init_reactions", &init_reactions);
  function("set_material", &set_material);
  function("set_profile", &set_profile);
  function("init_length", &init_length);
  function("set_gravity", &set_gravity);
  function("init_point_loads", &init_point_loads);
  function("set_point_load", &set_point_load, allow_raw_pointers());
  function("solve_model", &solve_model);
}
