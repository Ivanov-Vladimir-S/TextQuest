"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hero {
    constructor() {
        this.mind = 2;
        this.health = 2;
        this.time = 0;
        this.pastTime = 0;
        this.hunger = 7;
    }
    changeMind(deltaMind) {
        this.mind += deltaMind;
    }
    changeHealth(deltaHealth) {
        this.health += deltaHealth;
    }
    changeTime(deltaTime) {
        this.time += deltaTime;
        if (this.time - this.pastTime >= Hero.hungerPerTime) { //Изменение голода с течением времени
            this.hunger--;
            this.pastTime = this.time;
        }
    }
    isMad() {
        return this.mind <= 0;
    }
    isDeath() {
        return this.health <= 0;
    }
    isStarve() {
        return this.hunger <= 0;
    }
}
Hero.criticalMind = 1;
Hero.criticalHealth = 1;
Hero.criticalHunger = 3;
Hero.hungerPerTime = 2;
exports.Hero = Hero;
//# sourceMappingURL=hero.js.map