<script>
  import { onMount } from 'svelte';
  import Tab, { Icon, Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';

  export let items;
  export let activeTab = '';

  onMount(() => {
    if(Array.isArray(items) && items.length){
      activeTab = items[0];  // default tab
    }
  });

  function handleClick(tabValue) {
    activeTab = tabValue
  }
</script>

<TabBar tabs={items} let:tab bind:activeTab>
  <Tab {tab} on:click={() => handleClick(tab)}>
  <Label>
    <Icon class="material-icons">{tab}</Icon>
  </Label>
  </Tab>
</TabBar>
