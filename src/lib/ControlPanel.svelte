<script>
    import Slider from "./Slider.svelte";
    import {shapeProperties} from "./store";
    import PlayPause from "./PlayPause.svelte";

    let paused = false;
    let open = true;
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

    const toggleOpen = () => {
        open = !open;
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

<main class={`w-[300px] h-full pt-10 bg-slate-900 bg-opacity-70 px-6 absolute transition ${open ? "left-0" : "-left-[300px]"}`}>
    <div class="relative">
        <div on:click={toggleOpen} class="absolute -top-10 -right-20 bg-slate-900 bg-opacity-70 p-4 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
            </svg>
        </div>
    </div>
    <div class="text-2xl lilita tracking-wide">
        ASCII Geometry
    </div>
    <div class="text-slate-400 opensans">
        by <a href="http://www.bakircinjarevic.com" class="underline hover:text-slate-300 text-inherit cursor-pointer">Bakir Činjarević</a>
    </div>
    <div class="border-b-slate-600 border-b pb-3 mt-5">
        <Slider
                on:change={handleChange}
                defaultValue={$shapeProperties.donutRadius}
                name="Donut radius"
                propertyName="donutRadius"
        ></Slider>
        <Slider
                on:change={handleChange}
                defaultValue={$shapeProperties.donutThicknessRadius}
                name="Donut thickness"
                propertyName="donutThicknessRadius"
        ></Slider>
        <Slider
                on:change={handleChange}
                defaultValue={$shapeProperties.distanceOfDonutFromViewer}
                name="Distance of donut"
                propertyName="distanceOfDonutFromViewer"
                max={200}
                step={1}
        ></Slider>
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
        <Slider
                on:change={handleChange}
                defaultValue={$shapeProperties.betaSpacing}
                name="Beta spacing"
                propertyName="betaSpacing"
                min={0.01}
                max={0.5}
                step={0.02}
        ></Slider>
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