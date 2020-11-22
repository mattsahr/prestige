<style>
    .rules-outer-wrapper {
        min-height: 200px;
        padding: 0 10px 10px 10px;
        border-radius: 4px;
        background: #b4f0c8;
        background: radial-gradient(circle, #b4f0c8 0%, #a0dcb4 67%, #78c8a0 100%);
        overflow-y: auto;
        max-height: 88vh;
    }

    .rules-wrapper {
        padding-top: 20px;
        padding-right: clamp(20px, 4vw, 60px);
        padding-bottom: 30px;
        padding-left: clamp(20px, 4vw, 60px);
        text-align: left;
    }

    .header {
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 0.01em;
        text-align: center;
        text-transform: uppercase;
        padding: 4px 0 6px 0;
    }

    .close-me {
        position: absolute;
        z-index: 10;
        top: 0px;
        right: -1px;
        opacity: 1;
        color: rgb(80, 150, 150);
        cursor: pointer;
        width: 36px;
        height: 32px;
        overflow: hidden;
        border: solid 1px rgba(255, 255, 255, 1);
        background-color: rgba(255, 255, 255, 1);
        border-radius: 13px;
    }

    .close-me .inner {
        padding: 0;
        width: 32px;
        height: 36px;
    }

    .close-me:hover {
        color: rgb(0, 70, 80);
        opacity: 1;
    }

    ul.lst-kix_fk4koyp0z9nz-0{
        list-style-type:none
    }
    .lst-kix_fk4koyp0z9nz-0>li:before{
        content:"\0025cf "
    }
    .c5{
        -webkit-text-decoration-skip:none;
        color:#000000;
        text-decoration:underline;
        vertical-align:baseline;
        text-decoration-skip-ink:none;
        font-size:11pt;
        font-family:"Arial";
        font-style:normal
    }
    .c1{
        padding-top:0pt;
        padding-bottom:0pt;
        line-height:1.15;
        orphans:2;
        widows:2;
        text-align:left;
        height:11pt
    }

    .c2{
        padding-top:0pt;
        padding-bottom:0pt;
        line-height:1.15;
        orphans:2;
        widows:2;
        text-align:left
    }
    .c3{
        color:#000000;
        text-decoration:none;
        vertical-align:baseline;
        font-size:11pt;
        font-family:"Arial";
        font-style:normal
    }
    .c6{
        text-decoration-skip-ink:none;
        -webkit-text-decoration-skip:none;
        color:#1155cc;
        text-decoration:underline
    }
    .c9{
        text-decoration-skip-ink:none;
        -webkit-text-decoration-skip:none;
        text-decoration:underline
    }
    .c12{
        padding:0;
        margin:0
    }
    .c13{
        color:inherit;
        text-decoration:inherit
    }
    .c11{
        padding-left:0pt
    }
    .c8{
        margin-left:36pt
    }
    .c4{
        font-weight:400
    }
    .c7{
        text-indent:36pt
    }
    .c0{
        font-weight:700
    }
    li{
        color:#000000;
        font-size:11pt;
        font-family:"Arial"
    }
    p{
        margin:0;
        color:#000000;
        font-size:11pt;
        font-family:"Arial"
    }

</style>

<script>
    import MdClose from 'svelte-icons/md/MdClose.svelte';

    export let handleClosePanel = () => false;
</script>

<div class="rules-outer-wrapper">

    <div class="close-me" on:click={handleClosePanel}><div class="inner"><MdClose /></div></div>

    <div class="rules-wrapper">

        <p class="header">Prestige Cities aka 2020 aka Cosmo Polix aka Cosmopolity</p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">You look out at the four miserable boroughs that comprise your tiny city and see a vision. &nbsp;A vision of a grand city, a powerhouse of industry and global commerce, a world-renowned center of learning and the arts, and a place where the residents are made happy and fulfilled by their access to recreation and culture. &nbsp;Can you bring this vision to life and construct the most prestigious city in the world?</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">In Prestige Cities, you&rsquo;ll be adding blocks of residences, industry, commerce, culture, and parks to your city, all with the goal of making it more prestigious. &nbsp;The game takes place over successive historical eras, and each era, a card will get flipped to tell you which kind of blocks you can choose from to add to your city. &nbsp;All players play simultaneously, so as you are adding to your city, other city leaders will be adding to their city based on the same era.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c0 c5">Scoring</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">Your city is made up of a grid of 8 columns by 9 rows. &nbsp;In the center is a smaller grid, the Inner District, which is 4 columns by 5 rows.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">Your city is rated on three categories:</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c0">Culture Score</span><span class="c3 c4">: Your culture score is the total number of blocks of Culture you have in the Inner District. &nbsp;Blocks of Culture outside the Inner District do not contribute to your culture score.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c0">Wealth Score</span><span class="c3 c4">: Your wealth score is the average of your number of blocks of Industry and blocks of Commerce. &nbsp;Commerce in the Inner District is especially prestigious, so you get an extra point added to your wealth score for each block of Commerce there.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c0">Happiness Score</span><span class="c3 c4">: &nbsp;Your happiness score is based on evaluating each block of Residential you have. &nbsp;Residents of your city do not like living next to factories, but they do like having easy access to parks and culture. &nbsp;</span></p>
        <p class="c2 c7"><span>-For each Residential block, if it touches any Industry blocks, 1 point is subtracted from your happiness score. &nbsp;</span></p>
        <p class="c2 c7"><span class="c3 c4">-For each Residential block, if it touches any Parks blocks, 1 point is added to your happiness score. &nbsp;</span></p>
        <p class="c2 c7"><span class="c3 c4">-For each Residential block, if it touches any Culture blocks, 1 point is added to your happiness score. &nbsp;</span></p>
        <p class="c1 c7"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c0">Overall Score</span><span class="c3 c4">: &nbsp;The most prestigious city is well balanced, so your overall score is based on the sum of your lowest two of your Culture Score, your Wealth Score, and your Happiness Score, throwing out the highest. &nbsp;To that number, you&rsquo;ll add any Bonus Points you may have scored.</span></p>
        <hr style="page-break-before:always;display:none;">
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c5 c0">Setup</span></p>
        <p class="c1"><span class="c5 c0"></span></p>
        <p class="c2"><span>Start by going to the Prestige Cities webpage (</span><span class="c6"><a class="c13" href="https://www.google.com/url?q=http://www.prestige-cities.netlify.app&amp;sa=D&amp;ust=1606045076701000&amp;usg=AOvVaw3fTGAyi-DgVbF-6hKiIcB4">www.prestige-cities.netlify.app</a></span><span class="c3 c4">). &nbsp;Type your name and city name into the pop-up, as well as the game name that you&rsquo;ve agreed upon with the other players in your group. &nbsp;The first person to create the new game will be presented with a random set of bonus cards--one from each of the four bonus decks--and will have the option of accepting them or reshuffling them.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">At the beginning of the game, your city has four separate Residential blocks, each of them next to an Industry block. &nbsp;Your culture score is 0 because you have no blocks of Culture in the Inner District. &nbsp;Your wealth score is 2 because that is the average number of Industry and Commerce blocks that you have. &nbsp;And your happiness score is -4 because each of your Residential blocks touches an Industry block. &nbsp;Time to turn this city around!</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c5 c0">Game Play</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span>Each round of the game, someone will choose &ldquo;Next Turn&rdquo; from the menu on the upper right, causing a new era card to be revealed, which will tell the players which era they&rsquo;ve entered and automatically roll the appropriate dice for that era. &nbsp;Based on the available dice, the players choose </span><span class="c9">one type of block</span><span class="c3 c4">&nbsp;to add to their city. &nbsp;The number of blocks you can add is determined by the number on the die. &nbsp;The type of block is determined by the color:</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-the yellow die corresponds to Industry</span></p>
        <p class="c2"><span class="c3 c4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-the blue die corresponds to Commerce</span></p>
        <p class="c2"><span class="c3 c4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-the red die corresponds to Residential</span></p>
        <p class="c2"><span class="c3 c4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-the purple die corresponds to Culture</span></p>
        <p class="c2"><span class="c3 c4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-the green die corresponds to Parks.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2 c7"><span class="c3 c4">! &nbsp; &nbsp;Important: Die rolls of 6 are set aside and unavailable &nbsp; !</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">Example: The Drought era is revealed, so all of the dice except the green die are rolled. &nbsp;The die rolls are as follows: 6 Red, 1 Purple, 3 Blue, 5 Yellow. &nbsp;Because the red die is a 6, it is ignored and residential blocks cannot be placed. &nbsp;Each player has a choice of placing either 1 block of Culture, 3 blocks of Commerce, or 5 blocks of Industry.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <ul class="c12 lst-kix_fk4koyp0z9nz-0 start">
            <li class="c2 c8 c11"><span class="c3 c4">If you want to see the dice as they&rsquo;re rolled, expand the dice window by clicking the down era in the upper left.</span></li>
        </ul>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">Rules for placement:</span></p>
        <p class="c2"><span class="c3 c4">--the blocks you place in a round must all be adjacent, but they do not need to touch similar blocks placed in previous rounds of the game. &nbsp;There are no restrictions regarding where any given type of block can be placed in your city.</span></p>
        <p class="c2"><span>--towards the end of the game, you may not be able to place all of the blocks shown on a die face of a particular color. &nbsp;</span><span class="c5 c4">You must choose a die color that you can place fully if you are able.</span></p>
        <p class="c2"><span class="c3 c4">--if you can&rsquo;t place any of the die colors fully, you are free to choose one and place it as fully as possible, bearing in mind that all the blocks you place this round must still be adjacent to each other.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">Once all players have chosen one of the available dice, someone clicks &ldquo;Next Turn&rdquo;, the next era is revealed and the appropriate dice are rolled. &nbsp;If all of the dice rolled are 6, then nothing is placed in this era.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">There are fifteen different eras, and at the beginning of the game, a virtual deck is created by choosing at random twelve of the eras and setting three aside. &nbsp;After 12 rounds, the virtual deck runs out and a new deck is created with the 3 eras that were set aside along with 9 random eras from the previous deck. &nbsp;</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--You can click the (i)nfo button next to the turn number indicator to see a list of the eras that have already been played in the current deck and which haven&rsquo;t been played but are guaranteed to appear soon because they were shuffled in after being set aside from the previous deck.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c5 c0">End of the Game</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">Play continues until one or more players have completely filled all blocks of their city. &nbsp;Final bonuses are then awarded and the game ends.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c5 c0">Eras in the Game</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">Feel Good Era - All dice are rolled.</span></p>
        <p class="c2"><span class="c3 c4">Drought - All dice are rolled except green.</span></p>
        <p class="c2"><span class="c3 c4">Recession - All dice are rolled except blue and yellow.</span></p>
        <p class="c2"><span class="c3 c4">Depression - All dice are rolled except blue, yellow, and purple.</span></p>
        <p class="c2"><span class="c3 c4">Baby Boom - Only red is rolled.</span></p>
        <p class="c2"><span class="c3 c4">War! - Only yellow is rolled.</span></p>
        <p class="c2"><span class="c3 c4">Culture War - All dice are rolled except purple.</span></p>
        <p class="c2"><span class="c3 c4">Stagflation - All dice are rolled but only rolls less than 3 are available.</span></p>
        <p class="c2"><span class="c3 c4">The &ldquo;Me&rdquo; Generation - Player chooses a color and places two squares of that color.</span></p>
        <p class="c2"><span class="c3 c4">The Golden Age - Player places one square of each color. &nbsp;They don&rsquo;t need to be contiguous.</span></p>
        <p class="c2"><span class="c3 c4">Tech Revolution - Only yellow and blue are rolled.</span></p>
        <p class="c2"><span class="c3 c4">Pandemic - All dice are rolled except red and blue.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">[In Blight expansion] Industrial Revolution - Only red and yellow are available and place one blight.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c0 c9">Bonus Cards</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">Players should manually add any bonus points they receive to the Bonus Points box on their city. &nbsp;If only one player fulfills a given bonus card, that player receives its full value, usually 5 points. &nbsp;If more than one player fulfills a bonus card at the same time, all of those players get the bonus points shown in parenthesis, usually 2 points. &nbsp;Some bonus cards do not award points but instead allow you to make changes to your city.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">The bonus cards come in four types:</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">Deck 1: &nbsp;Bonus cards from deck 1 award points as soon as a player or players reach some objective, such as being first to build at least 10 Industry blocks. &nbsp;Cards from deck one give bonus points, and they may also give the player the opportunity to add additional blocks to their city. &nbsp;These blocks do not need to be adjacent to the blocks already placed this round unless otherwise specified, though they must be adjacent to each other. &nbsp;Once a deck 1 bonus card has been fulfilled, it is no longer available to be fulfilled by other players in future rounds.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">Deck 2: &nbsp; Bonus cards from deck 2 are evaluated as soon as the deck rounds out for the first time, ie after 12 rounds. &nbsp;Once the points have been awarded and the deck reshuffled, the deck 2 bonus card is no longer available.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">Deck 3: The bonus from the deck 3 bonus cards are awarded to the player(s) that are first to complete their city. &nbsp;It may award points or the opportunity to change blocks in your city.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">Deck 4: &nbsp;The bonus cards from deck 4 are evaluated after the game is over. &nbsp; They may award points or the opportunity to change blocks in your city.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c5 c0">Catastrophes</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">Two of the era cards, Great Fire and Industrial Disaster, direct you to remove blocks from an opponent&rsquo;s city rather than adding blocks to your own city. &nbsp;The die roll indicates how many blocks should be removed.</span></p>
        <p class="c2"><span class="c3 c4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--you remove blocks from whichever city is currently higher than yours in the list of scores at the bottom of the page. &nbsp;The red arrow marks where you rank among the scores. &nbsp;If you are at the top of the score table, then you remove blocks from the city in last place. &nbsp;Since the scores update automatically, make sure everyone has had a chance to see whose city they change before anyone starts making changes.</span></p>
        <p class="c2"><span class="c3 c4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--to go to the opponent&rsquo;s city, double-click the appropriate city name on the list of cities at the bottom.</span></p>
        <p class="c2"><span class="c3 c4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--the blocks removed must be in a contiguous group.</span></p>
        <p class="c2"><span class="c3 c4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--if there is no group of adjacent blocks as large as the number rolled, then the player removing the blocks chooses a smaller group of adjacent blocks and removes them.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c5 c0">The Golden Age</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">One of the eras, &ldquo;The Golden Age&rdquo;, does not use dice. &nbsp;</span></p>
        <p class="c2"><span class="c3 c4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--for The Golden Age, you place one block of each type of square. &nbsp;These blocks do not need to be adjacent.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c5 c0">What the game app does (and does not do) for you</span></p>
        <p class="c1"><span class="c5 c0"></span></p>
        <p class="c2"><span class="c3 c4">The game app manages the deck of virtual era cards, it rolls the dice, and it calculates your score. &nbsp;Everything else, you have to do:</span></p>
        <p class="c2"><span class="c3 c4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--You are responsible for placing the right number of squares and doing so legally.</span></p>
        <p class="c2"><span class="c3 c4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--When catastrophes occur, you are responsible for removing the right number of squares from the appropriate city.</span></p>
        <p class="c2"><span class="c3 c4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--You are responsible in collaboration with your fellow players for calculating and entering your bonus points.</span></p>
        <p class="c2"><span class="c3 c4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--You are responsible for ensuring that everyone has finished their placement before someone selects &ldquo;Next Turn&rdquo;.</span></p>
        <p class="c1"><span class="c5 c0"></span></p>
        <p class="c2"><span class="c5 c0">Bonus Cards</span></p>
        <p class="c1"><span class="c5 c0"></span></p>
        <p class="c2"><span class="c5 c0">Deck 1</span></p>
        <p class="c2"><span class="c0">Titan of Industry - </span><span class="c3 c4">First player to have at least 10 yellow squares gets 5 bonus points (or 2 points if more than one player achieves this at the same time) and gets to place 2 contiguous purple squares.</span></p>
        <p class="c1"><span class="c3 c0"></span></p>
        <p class="c2"><span class="c0">Urban Paradise - </span><span class="c3 c4">First player to have at least 10 green squares gets 5 bonus points (or 2 points if more than one player achieves this at the same time) and gets to place 2 contiguous red squares.</span></p>
        <p class="c1"><span class="c3 c0"></span></p>
        <p class="c2"><span class="c0">Public Benefactor - </span><span class="c3 c4">First player to have at least 10 blue squares gets 5 bonus points (or 2 points if more than one player achieves this at the same time) and gets to place 2 contiguous green squares.</span></p>
        <p class="c2"><span class="c0"><br>Cheap Labor - </span><span class="c3 c4">First player to have at least 10 red squares gets 5 bonus points (or 2 points if more than one player achieves this at the same time) and gets to place 2 contiguous yellow squares that must touch red squares.</span></p>
        <p class="c1"><span class="c0 c3"></span></p>
        <p class="c2"><span class="c5 c0">Deck 2</span></p>
        <p class="c2"><span class="c0">Industrial Powerhouse - </span><span class="c3 c4">When the deck runs out the first time, player with most yellow squares gets 5 bonus points (2 if it is tied).</span></p>
        <p class="c1"><span class="c3 c0"></span></p>
        <p class="c2"><span class="c0">Monument Builder &nbsp;- </span><span class="c3 c4">When the deck runs out the first time, player with most green squares squares gets 5 bonus points (2 if it is tied).</span></p>
        <p class="c1"><span class="c3 c0"></span></p>
        <p class="c2"><span class="c0">Retail Entrepreneur - </span><span class="c3 c4">When the deck runs out the first time, player with most blue squares that are touching red squares gets 5 bonus points (2 if it is tied).</span></p>
        <p class="c1"><span class="c3 c0"></span></p>
        <p class="c2"><span class="c0">Measured Growth - </span><span class="c3 c4">When the deck runs out the first time, player with least squares filled gets 5 bonus points (2 if it is tied).</span></p>
        <p class="c1"><span class="c3 c0"></span></p>
        <p class="c2"><span class="c0">Race to the Exurbs - </span><span class="c3 c4">When the deck runs out the first time, player with most squares filled</span></p>
        <p class="c2"><span class="c3 c4">on the outer edge gets 5 bonus points (2 if it is tied).</span></p>
        <p class="c2"><span class="c3 c0">&nbsp;</span></p>
        <p class="c2"><span class="c0">Downtown Developer - </span><span class="c3 c4">When the deck runs out the first time, player with the most squares filled in the Inner District gets 5 bonus points (2 if it is tied).</span></p>
        <p class="c1"><span class="c3 c0"></span></p>
        <p class="c2"><span class="c5 c0">Deck 3</span></p>
        <p class="c2"><span class="c0">Master Planner - </span><span class="c3 c4">First player to completely fill all squares in their city gets 5 bonus points (or 2 points if more than one player achieves this at the same time), and the game is over.</span></p>
        <p class="c1"><span class="c3 c0"></span></p>
        <p class="c2"><span class="c0">Rails to Trails - </span><span class="c3 c4">First player(s) to completely fill all squares in their city may convert up to 3 contiguous yellow squares to green squares, and the game is over.</span></p>
        <p class="c2"><span><br></span><span class="c0">The New Economy - </span><span class="c3 c4">First player(s) to completely fill all squares in their city may convert up to 4 contiguous yellow squares to blue squares, and the game is over.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c0">Rails to Trails - </span><span class="c3 c4">First player(s) to completely fill all squares in their city may convert up to 3 contiguous yellow squares to green squares, and the game is over.</span></p>
        <p class="c1"><span class="c5 c0"></span></p>
        <p class="c2"><span class="c5 c0">Deck 4</span></p>
        <p class="c2"><span class="c0">Champs Central - </span><span class="c3 c4">At the conclusion of the game, player with the largest cluster of green squares in the inner district gets 5 bonus points (2 if it is tied).</span></p>
        <p class="c1"><span class="c5 c0"></span></p>
        <p class="c2"><span class="c0">Culture for the Masses - </span><span class="c3 c4">At the conclusion of the game, player with the most purple squares outside the inner district gets 5 bonus points (2 if it is tied).</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c0">Global Hub of Finance - </span><span class="c3 c4">At the conclusion of the game, player with the largest cluster of contiguous blue squares gets 5 bonus points (2 if it is tied).</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c0">Mixed Use Builder - </span><span class="c3 c4">At the conclusion of the game, the player with the highest number of squares of the type of square that they have the least of gets 5 bonus points (2 if it is tied).</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c0">District Developer - </span><span class="c3 c4">At the conclusion of the game, count how many separate clusters you have of each color. &nbsp;The player with the highest number of clusters of the type they have the least of gets 5 bonus points (2 if it is tied).</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c5 c0">Expansions [To Be Implemented]</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c0">Blight</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">In the Blight expansion, blight will be a new type of block will be available to place in your city. &nbsp;Blight is an unfortunate side effect of runaway growth of your industries and population, as well as from large fires and industrial disasters.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">Blight only affects the happiness score:</span></p>
        <p class="c2"><span class="c3 c4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--for each Residential block, if it touches any blocks of Blight, one point is subtracted from your happiness score.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">In the Blight expansion, another era is added--Industrial Revolution, which provides Red and Yellow squares. &nbsp;The virtual deck still only contains 12 eras, so four eras are set aside instead of 3.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">Blight is added to your city in one of three ways.</span></p>
        <p class="c2"><span class="c3 c4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--Any time you add 4 or more Residential or Industrial blocks to your city in one round, you must add a block of Blight to an empty square that is adjacent to the blocks you just placed. &nbsp;If there are no empty blocks adjacent to the blocks you just placed, then convert an occupied block adjacent to the blocks you just placed into a block of Blight.</span></p>
        <p class="c2"><span class="c3 c4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--If Residential or Industry blocks are removed from your city by The Great Fire or Industrial Disaster, after the blocks have been removed, you fill one of the just-emptied blocks in your own city with a block of Blight.</span></p>
        <p class="c2"><span class="c3 c4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--As a result of the Industrial Revolution era, in addition to adding Residential or Industrial blocks, you also add an adjacent block of Blight. &nbsp;Even if 6es are rolled on both the red and yellow dice, you still add a block of Blight.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2 c7"><span class="c3 c4">An additional bonus card is added to the deck 3 of the bonus cards:</span></p>
        <p class="c2 c8 c7"><span class="c0">Urban Rehab -</span><span class="c3 c4">&nbsp;First player(s) to completely fill all squares in their city may convert up to 3 blight squares that do not have to be contiguous to green squares, and the game is over.</span></p>
        <p class="c1 c8 c7"><span class="c3 c4"></span></p>
        <p class="c2 c7"><span class="c3 c4">An additional bonus card is added to the deck 4 of the bonus cards:</span></p>
        <p class="c2 c7 c8"><span class="c0">Suburban Lifestyle Dream -</span><span class="c3 c4">&nbsp;At the end of the game, player with the most red squares on the outer edge of the board not touching blight get 5 Bonus Points (2 if it is tied).</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c0">The Ocean</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">In the Ocean expansion, there is an ocean along the bottom edge of your city. &nbsp;Residential blocks benefit from being adjacent to the ocean (beachfront property!), but so do Industry blocks (cheap transportation and easy dumping of waste!).</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">Scoring is modified as follows:</span></p>
        <p class="c2"><span class="c3 c4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--for each Residential Block touching the ocean, your happiness score is increased by one.</span></p>
        <p class="c2"><span class="c3 c4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--for each Industry Block touching the ocean, your wealth score is increased by one.</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c0">Mountains</span></p>
        <p class="c1"><span class="c3 c4"></span></p>
        <p class="c2"><span class="c3 c4">In the Mountains expansion, a group of mountain blocks is placed in the middle of your city. &nbsp;</span></p>
        <p class="c2 c7"><span class="c3 c4">--These blocks are treated as filled blocks, and you can complete your city without ever building over these Mountain blocks.</span></p>
        <p class="c2 c7"><span class="c3 c4">--However, Residential blocks may be built overtop Mountain blocks.</span></p>
        <p class="c2 c7"><span class="c3 c4">--The Mountain expansion does not affect the calculation of scores in any way.</span></p>
        <p class="c2 c7"><span class="c3 c4">--If a Residential block built overtop a Mountain block is removed as a result of The Great Fire, it should revert to a Mountain block, or it could be replaced with a block of Blight if the Blight expansion is being used as well.</span></p>
        <p class="c1 c7"><span class="c3 c4"></span></p>

    </div>
</div>
