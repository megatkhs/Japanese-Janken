function Janken(el){
  this.$el = el;
  this.$start_btn = $('#start_btn');
  this.$counters = $('#jan_counter');
  this.$win_c = $('#win');
  this.$lose_c = $('#lose');
  this.$draw_c = $('#draw');
  this.$enemy_hand = $('#enemy_hand');
  this.$player_hand = $('#player_hand');
  this.$select_area = $('#select_area');
  this.handImages = {
    gu : './asset/hand_gu.svg',
    cho : './asset/hand_cho.svg',
    pa : './asset/hand_pa.svg'
  };
  this.setStartHandleEvent();
}

Janken.prototype.setStartHandleEvent = function(){
  console.log('%c登録-始める', 'color: #0083cd');
  let self = this;
  this.$el.on('click', '#start_btn', function(){
    console.log('%c押下-始める', 'color: #0083cd');
    self.clearStartHandleEvent();
    self.init();
  });
};

Janken.prototype.clearStartHandleEvent = function(){
  console.log('%c解除-始める', 'color: #0083cd');
  this.$el.off('click', '#start_btn');
};

Janken.prototype.init = function(){
  this.counters = {
    win : 0,
    draw : 0,
    lose : 0
  };
  this.$counters.children('div').children('span').text('0').hide().fadeIn();
  this.createBtns();
}

Janken.prototype.createBtns = function(){
  this.enemyHandStart();
  this.setHandHandleEvent();
}

Janken.prototype.enemyHandStart = function(){
  let char = [this.handImages.gu,this.handImages.cho,this.handImages.pa],
  self = this,
  count = 0,
  len = char.length;
  this.handLoop = setInterval(function () {
    self.$enemy_hand.children('img').attr('src',char[(count + (count++) + len) % len]);
    count++;
  }, 100);
};

Janken.prototype.setHandHandleEvent = function(){
  console.log('%c登録-ジャンケン', 'color: #00cd83');
  let self = this;
  this.$select_area.on('click', '#gu', function(){
    console.log('%c押下-グー', 'color: #00cd83');
    self.clearHandHandleEvent();
    self.jadge(0);
  });
  this.$select_area.on('click', '#cho', function(){
    console.log('%c押下-チョキ', 'color: #00cd83');
    self.clearHandHandleEvent();
    self.jadge(1);
  });
  this.$select_area.on('click', '#pa', function(){
    console.log('%c押下-パー', 'color: #00cd83');
    self.clearHandHandleEvent();
    self.jadge(2);
  });
};

Janken.prototype.clearHandHandleEvent = function(){
console.log('%c解除-ジャンケン', 'color: #00cd83');
  this.$select_area.off('click', '#gu');
  this.$select_area.off('click', '#cho');
  this.$select_area.off('click', '#pa');
};

Janken.prototype.jadge = function(hand){
  let pHand = hand,
  eHand = this.enemyHand(),
  j = '',
  self = this;

  if(pHand == 0 && eHand == 2) {
    this.jankenInterval(pHand, eHand, 2);
  } if(pHand == 2 && eHand == 0) {
    this.jankenInterval(pHand, eHand, 0);
  } else if( pHand > eHand ) {
    this.jankenInterval(pHand, eHand, 2);
  } else if( pHand == eHand ) {
    this.jankenInterval(pHand, eHand, 1);
  } else if( pHand < eHand ){
    this.jankenInterval(pHand, eHand, 0);
  } else {
    j = 'エラーですねこれは...';
  }
};

Janken.prototype.numChanger = function(num, type){
  if( type == 'hand'){
    switch (num) {
      case 0:
        return this.handImages.gu;
        break;
      case 1:
        return this.handImages.cho;
        break;
      case 2:
        return this.handImages.pa;
        break;
      default:
        console.log('不明な数値エラー num:' + num);
        return this.handImages.gu;
    }
  } else if( type == 'result' ) {
    switch (num) {
      case 0:
        ++this.counters.win;
        this.$win_c.children('span').text(this.counters.win).hide().fadeIn();
        break;
      case 1:
        ++this.counters.draw;
        this.$draw_c.children('span').text(this.counters.draw).hide().fadeIn();
        break;
      case 2:
        ++this.counters.lose;
        this.$lose_c.children('span').text(this.counters.lose).hide().fadeIn();
        break;
      default:
        console.log('不明な数値エラー num:' + num);
        return this.handImages.gu;
    }
  }
};

Janken.prototype.jankenInterval = function(pH, eH, j){
  let self = this;
  clearInterval(self.handLoop);
  this.numChanger(j, 'result');
  this.$enemy_hand.children('img').attr('src', this.numChanger(eH, 'hand'));
  this.$player_hand.children('img').attr('src', this.numChanger(pH, 'hand'));


  console.log(self.changeHand(pH),self.changeHand(eH),self.changeResult(j));

  if(this.counters.win == 3 || this.counters.lose == 3){
    this.jankenEnd();
    return
  }

  this.$el.children('#start_btn').text('次の戦いへ');
  this.setNextHandleEvent();
};

Janken.prototype.setNextHandleEvent = function(){
  console.log('%c登録-つぎへ', 'color: #cd3700');
  let self = this;
  this.$el.on('click', '#start_btn', function(){
    self.clearNextHandleEvent();
    self.$player_hand.children('img').attr('src', self.handImages.gu);
    self.createBtns();
    console.log('%c押下-つぎへ', 'color: #cd3700');
  });
};

Janken.prototype.clearNextHandleEvent = function(){
  console.log('%c解除-つぎへ', 'color: #cd3700');
  this.$el.off('click', '#start_btn');
};

Janken.prototype.changeHand = function(num){
  switch (num) {
    case 0:
      return 'グー'
      break;
    case 1:
      return 'チョキ'
      break;
    case 2:
      return 'パー'
      break;
    default:
      return 'エラー'
  }
};

Janken.prototype.changeResult = function(num){
  switch (num) {
    case 0:
      return '勝ち'
      break;
    case 1:
      return 'あいこ'
      break;
    case 2:
      return '負け'
      break;
    default:
      return 'エラー'
  }
};

Janken.prototype.jankenEnd = function(){
  this.$el.children('#start_btn').text('再挑戦');
  this.setStartHandleEvent();
}

Janken.prototype.enemyHand = function(){
  return Math.floor(Math.random()*3);
}

let janken_start = new Janken( $('#btn_area') );

window.addEventListener('load', function(){
  $('#content_area').addClass('on');
  $('#close_btn').on('click', function(){
    $('#first_screen').fadeOut();
  });
});
