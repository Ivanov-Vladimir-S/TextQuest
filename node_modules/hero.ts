export class Hero{
    mind:number;
    health:number;
    time:number;
    pastTime: number;
    hunger:number;
    static criticalMind: number = 1;
    static criticalHealth: number = 1;
    static criticalHunger: number = 3;
    static hungerPerTime: number = 2;
    constructor(){
        this.mind = 2;
        this.health = 2;
        this.time = 0;
        this.pastTime = 0;
        this.hunger = 7;
    }
    changeMind (deltaMind: number): void {
          this.mind += deltaMind;
    } 
    changeHealth (deltaHealth: number): void {
        this.health += deltaHealth;
    } 
    changeTime (deltaTime: number): void {
        this.time += deltaTime;
        if(this.time - this.pastTime >= Hero.hungerPerTime){//Изменение голода с течением времени
            this.hunger--;
            this.pastTime = this.time;
        }
    }
    isMad(): boolean {
        return this.mind <= 0;
    }
    isDeath(): boolean {
        return this.health <= 0;
    }
    isStarve(): boolean {
        return this.hunger <= 0;
    }
}