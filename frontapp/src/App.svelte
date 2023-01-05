<script>
	import Header from './Header/Header.svelte';
    import Graph from "./Ggraphic/index.svelte"
	import Options from "./Options/Options.svelte";
</script>


<style>
	.AppWrapper{
	}
	.InlinePage{
		display: flex;
		flex-direction: row;
		margin: 60px auto 0 auto;
		column-gap: 10px;
		height: auto;
		width: 100%;
		justify-content: center;

	}
	.ContentPage{
		padding: 30px;
		border-radius: 5px;
		width: 70%;
		background: white;
		box-shadow: 0 0 10px rgba(153, 153, 153, 0.28);
	}
	.ADV {
		width: 10%;
		height: fit-content;
		box-shadow: none;
	}

	h1{
		color: #ff8d48;
	}

	.CalculatorWrapper{
		height: 600px;
		border: #ff8d48 1px solid;
		margin-top: 20px;
		display: flex;
		flex-direction: row;
		column-gap: 2%;
		padding:2%;
		justify-content: space-between;

	}
	@media (max-width: 480px) {
		.InlinePage{
			margin: 0;
		}
		.CalculatorWrapper{
			flex-direction: column;
		}
	}
	.OptionsWrapper{
		height: content-box;
		width: 30%;
		overflow-y: scroll;
	}
	.PictureWrapper{
		width: 70%;
		height: content-box;
		border:  #ff8d48 1px solid;
		background-color: white;
	}
</style>

<div class="AppWrapper">
	<Header />
	<div class="InlinePage">
		<div class="ContentPage ADV">advertising</div>
		<div class="ContentPage">
			<h1>Beam calculator(Title)</h1>
			<p>Some description about calculator(Description)</p>
			<div class="CalculatorWrapper">
				<div class="OptionsWrapper">
					<Options/>
				</div>
				<div class="PictureWrapper">
					<Graph/>
				</div>
			</div>
		</div>
		<div class="ContentPage ADV">advertising</div>
	</div>
</div>
