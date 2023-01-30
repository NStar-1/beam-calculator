<script>
	import Header from './Header/Header.svelte';
    import Graph from "./Ggraphic/newchart.svelte"
	import Options from "./Options/Options.svelte";
	import {dictionary, locale, _} from "svelte-i18n"
	import {dict} from "./dictionary";
    import { onMount } from 'svelte';
	dictionary.set(dict)
	locale.set("en")
	onMount(()=>{
			if(window.matchMedia('(max-width: 480px)').matches)
			{
				let options = document.getElementById('options');
				let picture = document.getElementById('picture');
				picture.parentNode.appendChild(options);
			}
	})

</script>


<style>
	.AppWrapper{
	}
	.InlinePage{
		display: flex;
		flex-direction: row;
		margin: 30px auto 0 auto;
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
		height: 65vh;
		border: #ff8d48 1px solid;
		margin-top: 20px;
		display: flex;
		flex-direction: row;
		column-gap: 2%;
		padding:2%;
		justify-content: space-between;

	}
	.OptionsWrapper{
		height: content-box;
		width: 300px;
		min-width: 30%;
		overflow-y: scroll;
	}
	.PictureWrapper{
		width: 70%;
		height: content-box;
		border:  #ff8d48 1px solid;
		background-color: white;
	}
	@media (max-width: 480px) {
		.InlinePage{
			margin: 0;
			column-gap: 0;
			width: 100%;
			height: auto;
		}
		.ADV{
			display: none;
		}
		.CalculatorWrapper{
			border: none;
			column-gap: 0;
			row-gap: 10px;
			padding: 0;
			flex-direction: column;
			justify-content: unset;
		}
		.ContentPage{
			width: 100%;
			height: 100%;
		}
		.OptionsWrapper{
			width: 100%;
			overflow: unset;
		}
		.PictureWrapper{
			width: 100%;
			min-height: 35vh;
		}
	}

</style>

<div class="AppWrapper">
	<Header />
	<div class="InlinePage">
		<div class="ContentPage ADV">advertising</div>
		<div class="ContentPage">
			<h1>{$_('app.title')}</h1>
			<p>{$_('app.desc')}</p>
			<div class="CalculatorWrapper">
				<div class="OptionsWrapper" id="options">
					<Options/>
				</div>
				<div class="PictureWrapper" id="picture">
					<Graph/>
				</div>
			</div>
		</div>
		<div class="ContentPage ADV">advertising</div>
	</div>
</div>
