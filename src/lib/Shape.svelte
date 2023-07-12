<script lang="ts">
    import {render} from "./Render";
    import {shapeProperties} from "./store";

    const framerate = 24;

    let x=0,y=0,z=0;
    let screen: string[][] = [];

    setInterval(() => {
        screen = render(x, y, z, $shapeProperties);
        x += $shapeProperties.xIncrement;
        y += $shapeProperties.yIncrement;
        z += $shapeProperties.zIncrement;
    }, 1000/framerate)

</script>

<main class="md:h-fit">
    {#each screen as row}
        <div class="font-mono md:leading-3 md:tracking-[4px] md:text-md sm:leading-[8px] sm:text-sm sm:tracking-widest text-xs leading-[6px]">
            {#each row as char}
                {#if (char === ' ')}
                    <span>&nbsp;</span>
                {:else}
                    {char}
                {/if}
            {/each}
        </div>
    {/each}
</main>