<script>
</script>

<style>
    .HeaderWrapper{
        display: flex;
        position: sticky;
        top: 0;
        width: 100%;
        height: 60px;
        background: #ff9859;
        box-shadow: 10px 0 50px rgba(153, 153, 153, 0.54);
    }
    .ContentHeader{
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin: 0 15%;
        flex-direction: row;
    }
    button{
        display: flex;
        height: 100%;
        border: none;
        align-items: center;
        color: #ffffff;
        background: transparent;
        text-decoration:1px solid white underline;
        cursor: pointer;
    }
    button:active, button:hover{
        background: #ff8d48;
    }
    .AppName{
        display: flex;
        height: 100%;

        align-self: center;
        color: white;

    }
    @media (max-width: 480px) {
        .AppName{
            height: 60%;
        }
    }
</style>


<div class="HeaderWrapper">
    <div class="ContentHeader">
        <img rel='icon' src='/assets/logo.svg' alt='icon' class="AppName"/>
        <div style="flex-direction: row; display: flex">
            <button>switch lng wbh</button>
            <button on:click={()=> console.log('a')}>
                About us
            </button>
        </div>

    </div>
</div>