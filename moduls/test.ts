  import {Episode, ConvertedEpisode} from "./episode";
  import {Hero} from "./hero";

  export class Test{
      private hero: Hero; 
      static hungerPhrases: string[] = ["",""," Чувствую себя очень голодным."," Голод подступает с новой силой."," Как же хочется есть."];
      static mindPhrases: string[] = ["",""," Чувствую, как схожу с ума."," Кто это? Кто говорит? Опять голоса в голове. Остановитесь!"," Аааааааа. Эээээ. ООооо!"];
      episode: ConvertedEpisode;
       
      constructor(episod: string, hero: Hero){
        this.hero = hero;
        this.episode = this.convertText(require("./"+episod));
      }
      nextEpisode(num: string): void{
        this.changeMind();
        this.changeHealth();
        this.changeTime();
        this.changeEpisode(num);
      }
      private changeEpisode(num: string): void {
        if(!this.hero.isMad() && !this.hero.isStarve() && !this.hero.isDeath()){
          this.episode = require("./" + this.episode.to[Number(num)]);
          this.episode = this.convertText(this.episode);
        }
        else{
          if(this.hero.isMad()){
            this.episode = require("./ep_end");
          }
          if(this.hero.isStarve()){
            this.episode = require("./ep_end2");
          }
          if(this.hero.isDeath()){
            this.episode = require("./ep_end3");
          }
        }
      }
      private convertText(newEp: Episode): ConvertedEpisode{//изменение текста и выборов в зависимости от параметров героя
          const converted = newEp;
          if(converted.banAdds == null){
            
            if(this.hero.hunger<=Hero.CRITICAL_HUNGER){
                converted.text = converted.text + Test.hungerPhrases[this.getRandomInt(0,Test.hungerPhrases.length-1)];
            }
            if(this.hero.mind<=Hero.CRITICAL_MIND){
              converted.text = converted.text + Test.mindPhrases[this.getRandomInt(0,Test.mindPhrases.length-1)];
            }
          }

          for(let i = 0; i<converted.choice.length; i++){
            let choice =  converted.choice[i];          
            if(typeof choice !== "string"){
              if(choice.mind !== undefined){ 
                if(choice.mind >= this.hero.mind){
                  choice = choice.text;
                  let to = converted.to[i];
                  to = typeof to !== "string"? to.text:to; 
                  converted.to[i] = to;
                }
                else{
                    choice = "";
                    converted.to[i] = "";
                }
              }
              else if(choice.health !== undefined){ 
                if(choice.health < this.hero.health){
                  choice = choice.text;
                  let to = converted.to[i];
                  to = typeof to !== "string"? to.text:to; 
                  converted.to[i] = to; 
                }
                else{
                  choice = "";
                  converted.to[i] = "";
                }
              }
            }
            converted.choice[i] = choice;
          }
          return converted as ConvertedEpisode;
      }
      private changeMind (): void {
        const episodeJson = this.episode;
        if(episodeJson.mind != undefined){
          this.hero.changeMind(episodeJson.mind);
        }
      }
      private changeHealth (): void {
        if(this.episode.health != undefined){
          this.hero.changeHealth(this.episode.health);
        }
      }
      private changeTime (): void {
        if(this.episode.time != undefined){
          this.hero.changeTime(this.episode.time);
        }
      }
      private getRandomInt(min: number, max: number): number{
        return Math.floor(Math.random()*(max-min))+min;
      }
    }

