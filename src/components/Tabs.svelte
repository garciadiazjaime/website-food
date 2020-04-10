<script>
  import Tab, {Icon, Label} from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  let active = 'Home';
  let iconTabs = [
    {
      icon: 'access_time',
      label: 'Recents'
    },
    {
      icon: 'near_me',
      label: 'Nearby'
    },
    {
      icon: 'favorite',
      label: 'Favorites'
    }
  ];
  let keyedTabs = [
    {
      k: 1,
      icon: 'code',
      label: 'Code'
    },
    {
      k: 2,
      icon: 'code',
      label: 'Code'
    },
    {
      k: 3,
      icon: 'code',
      label: 'Code'
    },
    {
      k: 4,
      icon: 'code',
      label: 'Code'
    }
  ];
  let keyedTabsActive = keyedTabs[2];
</script>
<TabBar tabs={['Phones', 'Address', 'Offer']} let:tab bind:active>
  <!-- Notice that the `tab` property is required! -->
  <Tab {tab}>
    <Label>{tab}</Label>
  </Tab>
</TabBar>