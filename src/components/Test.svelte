<script>

    const dummyName = 'Stinko Winko';

    const randoPlayers = [
        ['666BBB', 'Lucinda FogleHorn'],
        ['777CCC', 'Rufus ThirdPoop'],
        ['888DDD', 'Angela Fourfegnoogin'],
        ['999EEE', 'Ed Dunn'],
        ['111FFF', 'Karen PrivilegeSmith']
    ];

    const handleLogState = () => {
        console.log('Yo Click A!', gStore.get.scores());
        console.log('whole thing', $gStore);
    };

    const handleAddLocalPlayer = e => {
        gStore.player.updateLocal(dummyName, null, 'isLocalPlayer');
        console.log('newest game self', gStoree.get.self());

        console.log('game', $gStore);
    };

    const handleAddAnother = e => {
        const [ nextId, nextName ] = randoPlayers.pop();
        console.log('ADDING', nextId, nextName);
        gStore.addPlayer(nextName, null);
    };

</script>

<div class="buttonz">
    <button on:click={handleLogState}> log state </button>
    <button on:click={handleAddLocalPlayer}> Add Local Player </button>
    <button on:click={handleAddAnother}> Add Opponent </button>
    <button on:click={handleJoinGame} disabled={!$localPlayerId}> Join Game </button>
</div>


<style>
    .buttonz {
        padding: 30px;
        position: absolute;
        bottom: 30px;
        z-index: 20;
    }

    .buttonz button {
        padding: 8px;
    }
</style>