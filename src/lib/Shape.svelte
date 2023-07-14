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

<main class="md:h-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    {#each screen as row}
        <div class="font-mono md:leading-3 md:tracking-[4px] whitespace-nowrap sm:leading-[8px] text-sm sm:tracking-widest leading-[6px]">
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