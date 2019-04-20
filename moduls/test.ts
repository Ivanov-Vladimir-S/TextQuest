
  import {Hero} from "./hero";

  export class Test{
      private hero: Hero; 
      static hungerPhrases: string[] = ["",""," Чувствую себя очень голодным."," Голод подступает с новой силой."," Как же хочется есть."];
      static mindPhrases: string[] = ["",""," Чувствую, как схожу с ума."," Кто это? Кто говорит? Опять голоса в голове. Остановитесь!"," Аааааааа. Эээээ. ООооо!"];
      episode: string;
       
      constructor(episod: string){
        this.hero = new Hero();
        this.episode = JSON.stringify(require("./"+episod));
        this.episode = this.convertText(this.episode);
      }
      nextEpisode(num: string): void{
        this.changeMind();
        this.changeHealth();
        this.changeTime();
        this.changeEpisode(num);
      }
      private changeEpisode(num: string): void {
        if(!this.hero.isMad() && !this.hero.isStarve() && !this.hero.isDeath()){
          this.episode = JSON.stringify(require("./" + JSON.parse(this.episode).to[num]));
          this.episode = this.convertText(this.episode);
        }
        else{
          if(this.hero.isMad()){
            this.episode = JSON.stringify(require("./ep_end"));
          }
          if(this.hero.isStarve()){
            this.episode = JSON.stringify(require("./ep_end2"));
          }
          if(this.hero.isDeath()){
            this.episode = JSON.stringify(require("./ep_end3"));
          }
        }
      }
      private convertText(newEp: string): string{//изменение текста и выборов в зависимости от параметров героя
          const converted = JSON.parse(newEp);
          if(converted.banAdds == undefined){
            
            if(this.hero.hunger<=Hero.criticalHunger){
                converted.text = converted.text + Test.hungerPhrases[this.getRandomInt(0,Test.hungerPhrases.length-1)];
            }
            if(this.hero.mind<=Hero.criticalMind){
              converted.text = converted.text + Test.mindPhrases[this.getRandomInt(0,Test.mindPhrases.length-1)];
            }
          }

          for(let i = 0; i<converted.choice.length; i++){
            if(converted.choice[i].mind != undefined){ 
              if(converted.choice[i].mind >= this.hero.mind){
                converted.choice[i] = converted.choice[i].text;
                converted.to[i] = converted.to[i].text; 
              }
              else{
                  converted.choice[i] = "";
                  converted.to[i] = "";
              }
            }

            if(converted.choice[i].health != undefined){ 
              if(converted.choice[i].health < this.hero.health){
                converted.choice[i] = converted.choice[i].text;
                converted.to[i] = converted.to[i].text; 
              }
              else{
                converted.choice[i] = "";
                converted.to[i] = "";
              }
            }
          }
          return JSON.stringify(converted);
      }
      private changeMind (): void {
        const episodeJson = JSON.parse(this.episode);
        if(episodeJson.mind != undefined){
          this.hero.changeMind(episodeJson.mind);
        }
      }
      private changeHealth (): void {
        const episodeJson = JSON.parse(this.episode);
        if(episodeJson.health != undefined){
          this.hero.changeHealth(episodeJson.health);
        }
      }
      private changeTime (): void {
        const episodeJson = JSON.parse(this.episode);
        if(episodeJson.time != undefined){
          this.hero.changeTime(episodeJson.time);
        }
      }
      private getRandomInt(min: number, max: number): number{
        return Math.floor(Math.random()*(max-min))+min;
      }
    }

