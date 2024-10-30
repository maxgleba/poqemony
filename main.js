const createCharacter = (name, healthElement, attackButton, specialButton) => ({
    name,
    health: 100,
    healthElement,
    attackButton,
    specialButton,
    enemy: null,

    attack() {
        return Math.floor(Math.random() * 10) + 5;
    },
    specialAttack() {
        return Math.floor(Math.random() * 20) + 10;
    },
    updateHealthBar() {
        this.healthElement.style.width = this.health + '%';
        if (this.health <= 0) {
            this.health = 0;
            alert(`${this.name} has fainted!`);
        }
    },
    showPokeball() {
        const pokeball = document.getElementById('pokeball');
        pokeball.style.visibility = 'visible';

        const attackerPos = this.attackButton.parentElement.getBoundingClientRect();
        const targetPos = this.enemy.attackButton.parentElement.getBoundingClientRect();

        pokeball.style.top = attackerPos.top + 'px';
        pokeball.style.left = attackerPos.left + 'px';

        setTimeout(() => {
            pokeball.style.top = targetPos.top + 'px';
            pokeball.style.left = targetPos.left + 'px';
        }, 50);

        setTimeout(() => {
            pokeball.style.visibility = 'hidden';
        }, 800);
    },
    battle(isSpecial = false) {
        if (isAttacking) return;
        isAttacking = true;
        this.showPokeball();
        const damage = isSpecial ? this.specialAttack() : this.attack();
        this.enemy.health -= damage;
        this.enemy.updateHealthBar();
        setTimeout(() => isAttacking = false, 800);
    }
});

// Створюємо об'єкти character і enemy
const pikachu = createCharacter('Pikachu', document.getElementById('health1'), document.getElementById('attack1'), document.getElementById('special1'));
const charmander = createCharacter('Charmander', document.getElementById('health2'), document.getElementById('attack2'), document.getElementById('special2'));

// Призначаємо один одного як супротивників
pikachu.enemy = charmander;
charmander.enemy = pikachu;

let isAttacking = false;

// Події для кнопок атаки та спеціальної атаки
pikachu.attackButton.addEventListener('click', function() {
    pikachu.battle();
});

pikachu.specialButton.addEventListener('click', function() {
    pikachu.battle(true);
});

charmander.attackButton.addEventListener('click', function() {
    charmander.battle();
});

charmander.specialButton.addEventListener('click', function() {
    charmander.battle(true);
});
