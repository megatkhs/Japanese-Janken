// インスタンス化してください。
function Janken() {
  console.log('%c開始-Janken()', 'color: #ffe600');
  this.$strBtn = $('#start_btn');
  this.$handBtn = $('#select_area').children('button');
  this.$cnts = $('#jan_counter');
  this.$eneHand = $('#enemy_hand');
  this.$plyHand = $('#player_hand');
  this.$jdgArea = $('#jadge_area > p');
  this.$cutin = $('#cutin_area');
  this.handAsset = ['./asset/hand_gu.svg', './asset/hand_cho.svg', './asset/hand_pa.svg'];
  this.handLabel = ['グー', 'チョキ', 'パー'];
  this.jadgeList = [
    {id: 0, name: 'あいこ', cnt: 0},
    {id: 1, name: '負け', cnt: 0},
    {id: 2, name: '勝ち', cnt: 0}
  ];
  this.startHandleEvent();
}

Janken.prototype.startHandleEvent = function(){
  let self = this;
  this.$strBtn.prop("disabled", false).on('click', function(){
    self.$strBtn.text('次へ').prop("disabled", true).off('click');
    self.init();
  });
};

Janken.prototype.init = function(){
  let len = this.jadgeList.length;
  for(let i = 0, len = this.jadgeList.length; i < len; i++){
    this.jadgeList[i].cnt = 0;
  }
  this.$jdgArea.text("");
  this.$cnts.find('span').text('0');
  this.jankenStart();
};

Janken.prototype.jankenStart = function(){
  this.enemyHandAnimeStart();
  this.jankenHandleEvents();
};

Janken.prototype.enemyHandAnimeStart = function(){
  let self = this,
  cnt = 0,
  len = this.handAsset.length;
  this.handLoop = setInterval(function(){
    self.$eneHand.children('img').attr('src', self.handAsset[(cnt + (++cnt) + len) % len]);
    cnt++;
    if(cnt == len)
      cnt = 0;
  }, 200);
};

Janken.prototype.jankenHandleEvents = function(){
  let self = this;
  this.$handBtn.prop("disabled", false).on('click', function(){
    self.$handBtn.prop("disabled", true).off('click');
    let hand = $(this).data('hand');
    self.jankenJadge( hand );
  });
};

Janken.prototype.jankenJadge = function(num){
  let pH = num,
  eH = Math.floor(Math.random()*3),
  jNum = (pH - eH + 3) % 3;
  let result = this.jadgeList[ jNum ];
  this.jadgeList[ jNum ].cnt++;
  this.jankenDraw(pH, eH, result);
};

Janken.prototype.jankenDraw = function(p, e, r){
  let self = this,
  target = 'div [data-index=\"' + r.id + '\"]';
  clearInterval(self.handLoop);
  this.$plyHand.children('img').attr('src', self.handAsset[p]);
  this.$eneHand.children('img').attr('src', self.handAsset[e]);
  this.$jdgArea.text(r.name);
  this.$cnts.children(target).children('span').text(r.cnt).hide().fadeIn();
  if(this.jadgeList[1].cnt == 3 || this.jadgeList[2].cnt == 3){
    let elClass = '';
    if(this.jadgeList[1].cnt == 3)
      elClass = 'lose';
    else if(this.jadgeList[2].cnt == 3)
      elClass = 'win';
    this.$cutin.toggleClass(elClass);
    this.$strBtn.text('再挑戦');
    setTimeout(function(){
      self.$cutin.toggleClass(elClass);
      self.startHandleEvent();
    }, 2000);
    return;
  }
  this.continueHandleEvent();
};

Janken.prototype.continueHandleEvent = function(){
  let self = this;
  this.$strBtn.prop("disabled", false).on('click', function(){
    self.$strBtn.prop("disabled", true).off('click');
    self.$jdgArea.text("");
    self.jankenStart();
  });
};

$(window).on('load', function(){
  $(window).off('load');
  $('#content_area').addClass('on');
  setTimeout(function(){
    $('#close_btn').fadeIn(600);
  }, 1600);
  $('#close_btn').on('click', function(){
    $('#close_btn').off('click');
    $('#first_screen').fadeOut();
    let janken = new Janken();
  });
});
