<script>
    import { navigate } from "svelte-navigator";
</script>


<div class="footer-wrapper">
    <div class="github-style" on:click={()=>navigate('https://github.com/NStar-1/beam-calculator')}>
        <img alt="github image"  src="assets/icons/github_logo.svg" class="logo"/>
        <p>project on github</p>
    </div>

</div>


<style>
    .footer-wrapper{
        display: flex;
        z-index: 0;
        position: fixed;
        bottom: 0;
        background-color: #ff8d48;
        height: 5vh;
        width: 100%;
        padding: 10px 15%;
    }
    .logo{
        height: 100%;
        
    }
    .github-style{
        display: flex;
        cursor: pointer;
    }
    @media(max-width: 480px){
        .footer-wrapper{
            position: static;
        }
    }
</style>