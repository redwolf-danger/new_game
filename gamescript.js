
function add_shooting_option(floor_obj){

      let main_wind = floor_obj.floor_DOM;
      console.log("floor dom is ",main_wind);
      main_wind.addEventListener("click",(ev)=>{
      if((!game_resumed) && (!game_over)){
      if (shooting_allowed === true){
      let x_cord = ev.clientX - main_wind.getBoundingClientRect().x;
      let y_cord = ev.clientY - main_wind.getBoundingClientRect().y;
      number_of_bullets_used++;
      ///adding reload feature
      if(number_of_bullets_used % 4 == 0){
           shooting_allowed = false;
           console.log('\n\n\nSHOOTING DISABLED\n\n\n');
                   // let message_box = document.getElementsByClassName(""); 
           message_board.style.color = "red";
           message_board.innerHTML = "RELOADING...";
           last_ctr = updn_ctr+3.5*10;
      };
      let bm_id = number_of_bullets_used;
      let bullet_mark = document.createElement("div");
      bullet_mark.setAttribute("class","bullet_mark");
      bullet_mark.setAttribute("id",`bm${number_of_bullets_used}`);
      main_wind.append(bullet_mark);
      bullet_mark.style.backgroundColor = "black";
      bullet_mark.style.height = "2px";
      bullet_mark.style.width = "2px";
      bullet_mark.style.position = "absolute";
      bullet_mark.style.top = `${y_cord-4}px`;
      bullet_mark.style.left = `${x_cord-6}px`;
      bullet_mark.style.border = "2px solid grey";
      bullet_mark.style.borderRadius = "50%";

      console.log('the event target is ',ev.target.id);
      let clicked_on = ev.target.id;
      if(clicked_on.startsWith("ce_")){
        ///adding the killing function 
        let dead_enemy = document.getElementById(clicked_on);
        let num_area = Number(dead_enemy.dataset.area_assigned[2]);
        floor_obj.grid_array[num_area]=1;
        // console.log('dead enemy was assigned the area of ',num_area);
        
        console.log('clicked on enemy ',clicked_on);
        console.log("initially enemies on this floor are", floor_obj.num_enemies);
        let score_console = document.getElementsByClassName("score_display")[0];
        // let message_box = document.getElementsByClassName(""); 
        // 24-36 for x
        // 0-13 for y 


        ///HEADHOT FEATURE STARTS
        let x_cord = ev.clientX - dead_enemy.getBoundingClientRect().x;
        let y_cord = ev.clientY - dead_enemy.getBoundingClientRect().y;
        let headshot_scored = false;
        if(x_cord>=23 && x_cord<=38.5 && y_cord<=13 && y_cord>=0){
            // UPDATE: ADD SCORE 150 FOR HEADSHOT
            headshot_scored = true;
            console.log('HEADSHOT');
            message_board.style.color = "purple";
            message_board.innerHTML = `HEADSHOT!!`;
          }
        ///HEADSHOT FEATURE ENDS


        //DEAD ANIMATION STARTS
        dead_enemy.classList.add("dead");
        //DEAD ANIMATION ENDS

        // REMOVING WHOLE SVG STARTS..

         setTimeout(() => {
            let id_num = Number(clicked_on.slice(3,));
        let svg_of_dead_enemy = document.getElementById(`e${id_num}`);
        console.log(`removing id e${id_num}`);
        svg_of_dead_enemy.remove();
        }, 900);
        
        // console.log('the enemy number of id is ',typeof id_num);
        
        // REMOVING WHOLE SVG ENDS..
         
        //UPDATING THE NUMBER OF ENEMIES AND SCORE STARTS
        floor_obj.num_enemies--;
        console.log('number of enemies are now',floor_obj.num_enemies);
        score += (headshot_scored ? 150 :100);
        console.log(score_console);
        score_console.innerHTML = `<h3>${score}</h3>`;
        console.log('score is now ',score);
        
        //UPDATING THE NUMBER OF ENEMIES AND SCORE ENDS
        

      }

      setTimeout(() => {
        let bullet_mark_to_disappear = document.getElementById(`bm${bm_id}`);
        bullet_mark_to_disappear.remove();
        // main_wind.removeChild(bullet_mark);
      }, 1000);
    };
  };
  })
};

//independent of floo1 and floor2





function create_enemy(floor_obj){
    // console.log("number of enemies on this floor are ",floor_obj.num_enemies);
    let n = floor_obj.grid_array.length;
    let decider = 1;
    let number_of_grid_boxes_left = 8 - floor_obj.num_enemies;
    console.log('\nthe number of grid boxes left are', number_of_grid_boxes_left);
    
    let random_grid_box = Math.ceil(Math.random()*number_of_grid_boxes_left);
    console.log('the random_grid_box_number is',random_grid_box);
    
    let boxes_seen = 0;
// ----generate a random number between 0 and number of 

    for(let i = 1; i<n; i++){
        // console.log(i);
        if(floor_obj.grid_array[i]===1){
            boxes_seen++;
            if(boxes_seen==random_grid_box){
                decider = i;
                floor_obj.grid_array[i] = 0;
                break;
            }
        };
    };

    console.log('the decider is ', decider,"\n\n");


    console.log('\n\n creating enemies....');
        enemies_1++;
        let floor_num = floor_obj.floor_DOM;
      // console.log(floor_obj);
      let html_to_be_added = `<svg
      id="e${enemies_1}"
      class="enemy"
      fill="#FFFFFF"
      data-area_assigned = "ar${decider}" 
      width="20vh"
      height="20vh"
      viewBox="0 0 24 24"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path id = "ce_${enemies_1}"
      data-area_assigned = "ar${decider}" 
        d="M9.103.435a1.753 1.753 0 0 1 1.652-.362c.218.072.406.203.609.333.16.101.348.145.493.261.072.058.014.16.014.232.189.45.29.942.13 1.42-.13.16-.362.203-.55.276-.03.203.043.39.072.594-.043.029-.072.058-.116.087.276-.015.551-.073.827-.13.101-.102.26-.044.39-.059.015-.203.088-.391.088-.594a.34.34 0 0 0 .116-.029c.014.145 0 .29.043.435.073.058.189.029.276.043 0 .058 0 .116.014.174 1.681-.014 3.377 0 5.058 0v.247h.16V2.42h.188c0 .26-.014.507 0 .768a.11.11 0 0 0 .073.029c0 .029.014.087.014.116.058-.058.13-.102.218-.073.014.044.029.087.043.145-.058.058-.087.13-.058.218.464.014.928 0 1.406 0 .044-.058.116-.087.189-.116a.464.464 0 0 1 .087.058h.68a.874.874 0 0 1 .015.333h-.696a.46.46 0 0 1-.087.073c-.072-.044-.13-.073-.202-.116h-1.261c-.247.072-.508.058-.754.014v.275H16.16a.532.532 0 0 1-.29.13c.044.218-.202.276-.29.436a.45.45 0 0 1-.231.174c-.073.449.087.87.203 1.29-.13.029-.276.072-.406.101-.073.29-.145.594-.203.884a.848.848 0 0 1-.507.58c-.174.203-.406.406-.682.42-.101.03-.174-.043-.246-.101-.362.029-.696-.145-1.015-.29-.347-.16-.666-.363-1-.55.03.202-.072.376-.145.55.16.072.377.13.464.304.058.13.116.276.116.435-.014.522-.072 1.044-.101 1.565.014.377-.174.754-.435 1.03-.174-.015-.319-.088-.478-.16-.058.13-.189.26-.116.42.058.189.058.392.145.566a6.674 6.674 0 0 1 1.217 1.753c.304.624.536 1.276.783 1.928.043 0 .13-.015.174-.015.058.189 0 .406.116.58.101.16.072.348.072.536-.029.435-.058.87-.101 1.305-.03.304-.102.609-.145.913.014.232.116.464.101.696-.014.217-.014.449-.188.608.014.493-.116.986.058 1.464.232.32.493.623.768.899.304.145.667.174.928.435.1.16.043.347.014.521a6.732 6.732 0 0 1-1.87 0c-.246-.058-.478-.159-.724-.188-.334.014-.725.145-1.03-.087-.028-.391.117-.768.189-1.145.029-.13.16-.217.145-.348-.03-.45-.058-.913-.087-1.362-.058-.03-.16-.058-.145-.145 0-.218-.072-.435-.13-.638a10.821 10.821 0 0 1-.16-1.681c-.014-.16.087-.276.203-.377.03-.246.058-.507.073-.754-.044-.13-.145-.232-.203-.348-.261.03-.638.087-.797-.188-.377-.565-.769-1.145-1.145-1.71-.16-.015-.348 0-.493-.102-.16-.174-.261-.405-.363-.623-.043.174-.072.362-.174.507-.087.145-.231.247-.333.377-.101.232-.188.464-.275.696-.102.29-.247.58-.276.899a1.543 1.543 0 0 1-.101.449c-.073.116-.203.16-.319.217-.087.189-.145.377-.275.537-.087.101-.232.13-.29.26-.058.174-.145.334-.218.493-.029.174.087.363.03.536-.102.435-.32.841-.522 1.232-.102.29-.174.595-.32.87-.057.116-.202.145-.318.16-.13.318-.276.623-.362.956a5.437 5.437 0 0 0-.03.971c0 .145.088.261.146.391.057.174.014.348-.015.522-.565.073-1.145.13-1.696-.043-.058-.044-.043-.116-.058-.174-.043-.261-.072-.536.015-.783.188-.681.348-1.362.536-2.043-.072-.073-.174-.13-.174-.247-.014-.188 0-.391.044-.58.087-.319.318-.565.434-.87.044-.13.03-.26.044-.39 0-.305.174-.551.304-.812.13-.218.232-.45.406-.638.116-.101.116-.26.203-.391.087-.16.232-.29.232-.479.029-.231-.058-.463-.03-.695.059-.681.19-1.348.305-2.03-.058-.072-.145-.144-.174-.246.015-.072.03-.13.044-.203l-.13-.217c.057-.087.115-.188.173-.275-.058-.044-.13-.102-.188-.145.072-.218.043-.537.304-.638.03.014.102.029.13.043-.043-.376-.043-.768-.086-1.145a3.534 3.534 0 0 1-.073-1.232c.145-.217.42-.304.667-.318-.319-.073-.638-.102-.942-.203-.015-.261.029-.522.072-.783.13-.507.073-1.029.145-1.55.073-.146.261-.175.42-.146.189.03.377-.029.566-.087 0-.072.014-.16 0-.232-.116-.507-.087-1.029 0-1.521.116-.638.377-1.261.855-1.71.319-.305.783-.45 1.217-.435.145 0 .232.145.348.232.058-.058.116-.116.16-.174-.073-.247-.189-.508-.174-.769.029-.58.217-1.174.652-1.565m4.522 4.102c.029.029.029.029 0 0m.203.029c.014.101.043.203-.015.29-.072.029-.16.029-.232.072.203 0 .406.015.61 0 .159-.043.1-.246.1-.362-.1-.116-.318-.044-.463 0m-.507.609c.145.159.217.405.347.565.189-.247.334-.508.551-.725-.26-.015-.522.015-.782-.015-.044.058-.073.116-.116.174z"
      />
    </svg>`
    // html_to_be_added =`<div class = "enemy" id = "e${enemies_1}" style ="height:20px; width:20px; background-color:green;"></div>`
    floor_num.innerHTML = html_to_be_added + floor_num.innerHTML;
    
    // console.log("enemies_1 are ",enemies_1);

    let enemy_generated = document.getElementById(`e${enemies_1}`);
    console.log(`enemy_generated with id e${enemies_1}`);
    // enemy_generated.onclick = killing_event();
  //   console.log(typeof enemy_generated);
    //--// let decider = Math.round((Math.random()*500));
    //
    // console.log(decider);
    //--// enemy_generated.style.left = `${decider+'px'}`; 



    //--// let decider = Math.round((Math.random()*500));
    //--// enemy_generated.style.left = `${decider+'px'}`; 
    // console.log("the type of grid_arr is ",typeof floor_obj.grid_array);
    // enemy_generated.style.gridArea = `0/${enemies_1}`; 
    // ----we can also use a ds which has a trie like structure to make it better but i am leaving it for now

    enemy_generated.style.gridArea = `ar${decider}`; 
    floor_obj.num_enemies++;
    return (enemies_1);
  }




  // ////////MAIN-------//////////

  console.log('working---');
  let shooting_allowed = true;
  let message_board = document.getElementsByClassName("message_board")[0];
  let game_resumed = false;
  let game_over = false;
  let score = 0;
  let enemies_1 = 0; //refers to the id 
  let kill_message;
  let num_enemies1 = 0;
  let num_enemies2 = 0;
  let main_wind = document.querySelector(".main");
  let floor_1 = document.querySelector(".floor1");
  let floor_2 = document.querySelector(".floor2");


  let floor_obj_1 = {
    num_enemies: 0,
    grid_array : [1,1,1,1,1,1,1,1,1],
  };

  let floor_obj_2 = {
    num_enemies: 0,
    grid_array: [1,1,1,1,1,1,1,1,1]
  };
  floor_obj_2.floor_DOM = floor_2;
  floor_obj_1.floor_DOM = floor_1;
  // addEventListener("DOMContentLoaded", (event) => {});

  add_shooting_option(floor_obj_1);
  add_shooting_option(floor_obj_2);

  //?left for now starts
  function toggle_quit_page(){
    let quit_page = document.getElementsByClassName("quit_page")[0]; 
    quit_page.classList.toggle("hide_option");
    game_resumed = !game_resumed;
  }
  //?left for now ends
  

//TODO ADDING TIMER FUNCTION STARTS
//TODO DISABLING CONTROLS FOR BACK_BTN FORMATTING STARTS
let number_of_bullets_used = 0;
let mytimer = 30;
let ctr = 0;
let time_console = document.getElementsByClassName("time_display")[0];
time_console.innerHTML = `<h3>${mytimer}s</h3>`;
let stopper = setInterval(() => {
  if((!game_over) && (!game_resumed)){
    ctr++;
    let time_left = mytimer-ctr;
    time_console.innerHTML = `<h3>${time_left}s</h3>`; 
    if(ctr==mytimer){
      console.log('----------TIME OVER---------');
      game_over = true;
      clearInterval(stopper);
      clearInterval(updation);
      console.log('entered this loop\n\n\n');
      let score_page = document.getElementsByClassName("score_page")[0]; 
      score_page.classList.toggle("hide_option");
      let final_score  = document.getElementsByClassName("final_score")[0];
      final_score.innerHTML = `<h2>${score}</h2>`;
    }
  };
},1000);

let hardness = 4;
let updn_ctr = 0;
let last_ctr = 0;

let updation = setInterval(() => {
  if((!game_over) && (!game_resumed)){
  updn_ctr++;
  if(!shooting_allowed){
    if(updn_ctr === last_ctr){
      shooting_allowed = true;
      console.log('\n\n\nSHOOTING ENABLED\n\n\n');
      message_board.style.color = "GREEN";
      message_board.innerHTML = `SHOOT`;
    }
  };

  if((floor_obj_1.num_enemies<hardness) || (floor_obj_2.num_enemies<hardness)){
    if(floor_obj_1.num_enemies<hardness){
      create_enemy(floor_obj_1);
    };
    if(floor_obj_2.num_enemies<hardness){
      create_enemy(floor_obj_2);
    }
    // console.log(score);
  };
};
}, 100);
//TODO ADDING TIMER FUNCTION ENDS
//TODO DISABLING CONTROLS FOR BACK_BTN_FORMATTING_ENDS

// if (game_over == true){
//     console.log('entered this loop\n\n\n');
//     let score_page = document.getElementsByClassName("score_page")[0]; 
//     score_page.classList.toggle("hide_option");
//     // game_resumed = !game_resumed;
// }



//////