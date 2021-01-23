<script>
  export let place;

  function clickHandler(place) {
    window.open(`https://www.instagram.com/${place.username}/`, "_blank");
  }
</script>

<style>
  .tile {
    padding: 6px 0;
    box-shadow: 2px 2px 6px 6px #c8c8c8;
    width: 100%;
  }

  .tile:hover {
    cursor: pointer;
  }

  h2 {
    margin: 0;
    padding: 0 6px 12px;
  }

  img {
    height: 180px;
    min-height: 180px;
    width: 100%;
    object-fit: cover;
  }

  .keywords {
    padding: 0 6px;
  }

  strong {
    font-weight: normal;
    display: inline-block;
  }

  strong::after {
    content: '|';
    display: inline-block;
    padding: 0 6px;
  }

  strong:last-of-type::after {
    content: '';
  }
</style>

<div class="tile" on:click={() => clickHandler(place)}>
  <h2>{place.title}</h2>

  <img src={place.mediaUrl} alt={place.title} />

  <p>{place.address || ''}</p>

  <div class="keywords">
    {#each place.keywords as keyword}
      <strong>{keyword}</strong>
    {/each}
  </div>
</div>
