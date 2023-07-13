<script lang="ts">
  import Counter from './lib/Counter.svelte'
  import Shape from "./lib/Shape.svelte";
  import ControlPanel from "./lib/ControlPanel.svelte";
</script>

<main class="bg-slate-950 w-screen text-white h-screen flex items-center justify-around">
  <ControlPanel></ControlPanel>
  <Shape></Shape>
</main>
