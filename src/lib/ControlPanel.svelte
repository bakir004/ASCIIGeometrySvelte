<script>
    import Slider from "./Slider.svelte";
    import {shapeProperties} from "./store";
    import PlayPause from "./PlayPause.svelte";

    let paused = false;
    let open = false;
    let type = 'donut'

    let outerHeight = 0, outerWidth = 0;

    const handleChange = (event) => {
        const newShapeProperties = {...$shapeProperties}
        if(event.detail.propertyName === 'xIncrement' || event.detail.propertyName === 'yIncrement' || event.detail.propertyName === 'zIncrement') {
            if(paused) {
                lastChangesIncrements[event.detail.propertyName] = event.detail.value
            } else {
                newShapeProperties[event.detail.propertyName] = event.detail.value
            }
        } else {
            newShapeProperties[event.detail.propertyName] = event.detail.value
        }
        shapeProperties.set({...newShapeProperties})
    }

    let lastChangesIncrements = {
        xIncrement: 0,
        yIncrement: 0,
        zIncrement: 0,
    }

    const togglePause = (event) => {
        paused = event.detail
        if(paused === true){
            const newShapeProperties = {...$shapeProperties}
            lastChangesIncrements.xIncrement = newShapeProperties.xIncrement
            lastChangesIncrements.yIncrement = newShapeProperties.yIncrement
            lastChangesIncrements.zIncrement = newShapeProperties.zIncrement
            newShapeProperties['xIncrement'] = 0;
            newShapeProperties['yIncrement'] = 0;
            newShapeProperties['zIncrement'] = 0;
            shapeProperties.set({...newShapeProperties})
        } else {
            const newShapeProperties = {...$shapeProperties}
            newShapeProperties['xIncrement'] = lastChangesIncrements.xIncrement;
            newShapeProperties['yIncrement'] = lastChangesIncrements.yIncrement;
            newShapeProperties['zIncrement'] = lastChangesIncrements.zIncrement;
            shapeProperties.set({...newShapeProperties})
        }
    }

    const onChangeDimensions = (w, h) => {
        const newShapeProperties = {...$shapeProperties}
        const ratio = w/h
        newShapeProperties.screenWidth = Math.floor(w / 14) + 15;
        newShapeProperties.screenHeight = Math.floor(newShapeProperties.screenWidth / ratio) - 10

        shapeProperties.set({...newShapeProperties})
    }

    $: onChangeDimensions(outerWidth, outerHeight)

    const toggleOpen = () => {
        open = !open;
    }

    const setType = (bodyType) => {
        type = bodyType
        const newShapeProperties = {...$shapeProperties}
        newShapeProperties.type = bodyType;
        shapeProperties.set({...newShapeProperties})
    }

</script>


<style>
    .agdasima {
        font-family: "Agdasima";
    }
    .lilita {
        font-family: 'Lilita One';
    }
    .opensans {
        font-family: 'Open Sans';
    }
</style>

<svelte:window bind:outerWidth bind:outerHeight />

{#if (!open)}
    <div on:click={toggleOpen} class="absolute z-10 animate-spin top-3 left-3 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    </div>
{:else}
{#if (open)}
    <div on:click={toggleOpen} class="w-[calc(100vw-300px)] absolute top-0 bottom-0 left-[300px] z-20"></div>
{/if}
<main style="scrollbar-width: thin;" class={`w-[300px] z-10 top-0 bottom-0 max-h-screen overflow-y-scroll overflow-x-hidden py-10 bg-slate-900 bg-opacity-70 px-6 absolute transition ${open ? "left-0" : "-left-[300px]"}`}>
    <div on:click={toggleOpen} class="cursor-pointer absolute top-4 right-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </div>

    <div class="text-2xl lilita tracking-wide">
        ASCII Geometry
    </div>
    <div class="text-slate-400 opensans">
        by <a href="http://www.bakircinjarevic.com" class="underline hover:text-slate-300 text-inherit cursor-pointer">Bakir Činjarević</a>
    </div>
    <div class="flex items-center justify-center gap-2 mt-3">
        <div on:click={() => setType('donut')} class={`${type === 'donut' ? 'bg-slate-700' : 'bg-slate-800'} cursor-pointer rounded px-2`}>Donut</div>
        <div on:click={() => setType('cube')}  class={`${type === 'cube' ? 'bg-slate-700' : 'bg-slate-800'} cursor-pointer rounded px-2`}>Cube</div>
    </div>
    <div class="border-b-slate-600 border-b pb-3">
        <Slider
                on:change={handleChange}
                defaultValue={$shapeProperties.donutRadius}
                name="Radius"
                propertyName="donutRadius"
        ></Slider>
        {#if (type === 'donut')}
        <Slider
                on:change={handleChange}
                defaultValue={$shapeProperties.donutThicknessRadius}
                name="Thickness"
                propertyName="donutThicknessRadius"
        ></Slider>
        <Slider
                on:change={handleChange}
                defaultValue={$shapeProperties.distanceOfDonutFromViewer}
                name="Distance"
                propertyName="distanceOfDonutFromViewer"
                max={200}
                step={1}
        ></Slider>
        {/if}
    </div>
    <div class="border-b-slate-600 border-b pb-3 mt-5">
        <Slider
                on:change={handleChange}
                defaultValue={$shapeProperties.xIncrement}
                name="Rotation speed X"
                propertyName="xIncrement"
                max={0.6}
                step={0.05}
        ></Slider>
        <Slider
                on:change={handleChange}
                defaultValue={$shapeProperties.yIncrement}
                name="Rotation speed Y"
                propertyName="yIncrement"
                max={0.6}
                step={0.05}
        ></Slider>
        <Slider
                on:change={handleChange}
                defaultValue={$shapeProperties.zIncrement}
                name="Rotation speed Z"
                propertyName="zIncrement"
                max={0.6}
                step={0.05}
        ></Slider>
    </div>
    <div class="border-b-slate-600 border-b pb-3 mt-5">
        <Slider
                on:change={handleChange}
                defaultValue={$shapeProperties.alphaSpacing}
                name="Alpha spacing"
                propertyName="alphaSpacing"
                min={0.01}
                max={0.5}
                step={0.02}
        ></Slider>
        {#if (type === 'donut')}
        <Slider
                on:change={handleChange}
                defaultValue={$shapeProperties.betaSpacing}
                name="Beta spacing"
                propertyName="betaSpacing"
                min={0.01}
                max={0.5}
                step={0.02}
        ></Slider>
        {/if}
    </div>
    <div class="border-b-slate-600 border-b pb-3 mt-5">
        <Slider
                on:change={handleChange}
                defaultValue={$shapeProperties.lightSourceX}
                name="Light source X"
                propertyName="lightSourceX"
                max={1}
                min={-1}
                step={0.1}
        ></Slider>
        <Slider
                on:change={handleChange}
                defaultValue={$shapeProperties.lightSourceY}
                name="Light source Y"
                propertyName="lightSourceY"
                max={1}
                min={-1}
                step={0.1}
        ></Slider>
        <Slider
                on:change={handleChange}
                defaultValue={$shapeProperties.lightSourceZ}
                name="Light source Z"
                propertyName="lightSourceZ"
                max={1}
                min={-1}
                step={0.1}
        ></Slider>
    </div>
    <div class="mt-4 text-center flex items-center justify-center gap-2">
        <span class={`agdasima text-2xl ${paused ? "animate-pulse" : ""}`}>{paused ? "Paused" : "Playing"}</span>
        <PlayPause on:togglePause={togglePause}></PlayPause>
    </div>
</main>
    {/if}