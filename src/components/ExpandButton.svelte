<style>
	.plus-button {
    background-color: #ff5926;
    height: 30px;
    width: 30px;
    border-radius: 999px;
    position: relative;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    transition: box-shadow .28s cubic-bezier(.4,0,.2,1);
  }
  .plus-button:after,.plus-button:before {
    content: "";
    display: block;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .plus-button:before {
    height: 14px;
    width: 3px;
  }

  .plus-button:after {
    height: 3px;
    width: 14px;
  }
</style>

<div class="plus-button" />
