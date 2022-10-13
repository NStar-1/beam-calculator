<script>
	import Header from './Header/Header.svelte';

</script>


<style>
	.AppWrapper{
	}
	.InlinePage{
		display: flex;
		flex-direction: row;
		margin: 60px auto;
		column-gap: 10px;
		height: auto;
		width: 100%;
		justify-content: center;

	}
	.ContentPage{
		padding: 10px;
		border-radius: 5px;
		width: 70%;
		background: white;
		height: 100vh;
		box-shadow: 0 0 10px rgba(153, 153, 153, 0.28);
	}
	.ADV {
		width: 10%;
		height: fit-content;
		box-shadow: none;
	}
	@media (max-width: 480px) {
		.Inline{
			margin: 0;
		}
	}
	h1{
		color: #ff8d48;

	}
	p{
	}
	.CalculatorWrapper{
		height: 600px;
		border: #ff8d48 1px solid;
		margin: 20px;
		display: flex;
		flex-direction: row;
		column-gap: 10px;
		padding: 10px;
		justify-content: space-between;
	}
	.OptionsWrapper{
		padding: 10px;
		height: content-box;
		width: 30%;
		border:  #ff8d48 1px solid;
	}
	.PictureWrapper{
		width: 70%;
		padding: 10px;
		height: content-box;
		border:  #ff8d48 1px solid;
	}
</style>

<div class="AppWrapper">
	<Header/>
	<div class="InlinePage">
		<div class="ContentPage ADV">advertising</div>
		<div class="ContentPage">
			<h1>Beam calculator(Title)</h1>
			<p>Some description about calculator(Description)</p>
			<div class="CalculatorWrapper">
				<div class="OptionsWrapper">
					inputs
				</div>
				<div class="PictureWrapper">
					picture
				</div>
			</div>
		</div>
		<div class="ContentPage ADV">advertising</div>
	</div>
</div>