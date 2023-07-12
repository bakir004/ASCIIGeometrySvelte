<script>
    import {createEventDispatcher} from "svelte";

    export let defaultValue;
    export let propertyName;
    export let name;
    export let min = 0;
    export let max = 10;
    export let step = 0.1;

    let value = defaultValue;

    const dispatch = createEventDispatcher();

    const handleOnChange = () => {
        dispatch('change', {propertyName: propertyName, value: value})
    }
</script>

<div class="my-1">
    <label class='agdasima text-xl'>{name}:</label>
    <div class="flex items-center justify-between gap-2">
        <input type="range" step={step} min={min} max={max} id="range1" bind:value on:change={handleOnChange}/>
        <p class="w-10 text-right">{value}</p>
    </div>
</div>

<style>
    .agdasima {
        font-family: "Agdasima";
    }
    #range1 {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        cursor: pointer;
        outline: none;
        overflow: hidden;
        border-radius: 16px;
    }

    #range1::-webkit-slider-runnable-track {
        height: 15px;
        background: #ccc;
        border-radius: 16px;
    }

    #range1::-moz-range-track {
        height: 15px;
        background: #ccc;
        border-radius: 16px;
    }

    #range1::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        height: 15px;
        width: 15px;
        background-color: #fff;
        border-radius: 50%;
        border: 2px solid #f50;
        box-shadow: -407px 0 0 400px #f50;
    }

    #range1::-moz-range-thumb {
        height: 15px;
        width: 15px;
        background-color: #fff;
        border-radius: 50%;
        border: 1px solid #f50;
        box-shadow: -407px 0 0 400px #f50;
    }
</style>

