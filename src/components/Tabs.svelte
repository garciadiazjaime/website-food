<script>
  import { onMount } from 'svelte';
  import Tab, { Icon, Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  export let items;
  export let activeTabValue = '';

  onMount(() => {
    //Set default active tab
    if(Array.isArray(items) && items.length){
      activeTabValue = items[0];
    }
  });

  const handleClick = tabValue => activeTabValue = tabValue;

</script>

<TabBar tabs={items} let:tab bind:activeTabValue>
  <!-- Notice that the `tab` property is required! -->
  <Tab {tab} on:click={() => handleClick(tab)}>
  <Label>
    <Icon class="material-icons">{tab}</Icon>
  </Label>
  </Tab>
</TabBar>