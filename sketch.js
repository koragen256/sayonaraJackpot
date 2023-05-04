let ims = {}
let so = {};
let game={};
let MS=1;
let anzuFont;

function preload() {
	anzuFont = loadFont('src/APJapanesefont.ttf');
	
	ims["f0"] = loadImage("src/frame/s0.png");
	ims["f1"] = loadImage("src/frame/s1.png");
	ims["f2"] = loadImage("src/frame/s2.png");

	ims["tati0_0"] = loadImage("src/tati/0_0.png");
	ims["tati0_1"] = loadImage("src/tati/0_1.png");

	ims["tati1_0"] = loadImage("src/tati/1_0.png");
	ims["tati1_1"] = loadImage("src/tati/1_1.png");
	ims["tati1_2"] = loadImage("src/tati/1_2.png");

	ims["tati2_0"] = loadImage("src/tati/2_0.png");

	ims["slot"] = loadImage("src/slot/slot.png");

	ims["tur0_0"] = loadImage("src/mark/2_0000.png");
	ims["tur0_1"] = loadImage("src/mark/2_0001.png");
	ims["tur0_2"] = loadImage("src/mark/2_0002.png");

	ims["mk_SEV"] = loadImage("src/mark/SEV.png");
	ims["mk_PIE"] = loadImage("src/mark/PIE.png");
	ims["mk_CHE"] = loadImage("src/mark/CHE.png");
	ims["mk_BAR"] = loadImage("src/mark/BAR.png");
	ims["mk_BEL"] = loadImage("src/mark/BEL.png");

	so["st"] = loadSound("src/sound/st.wav")
	so["sp"] = loadSound("src/sound/sp.wav")
	so["ata"] = loadSound("src/sound/ata.wav")
	so["jack"] = loadSound("src/sound/jackPot.wav")

	game = new Game();
	game.render.s1.push(ims["f0"]);
	game.render.s1.push(ims["f1"]);
	game.render.s1.push(ims["f2"]);

	game.render.mb.push(ims["tur0_0"]);
	game.render.mb.push(ims["tur0_1"]);
	game.render.mb.push(ims["tur0_2"]);

	game.render.mk.push(ims["mk_SEV"]);
	game.render.mk.push(ims["mk_PIE"]);
	game.render.mk.push(ims["mk_CHE"]);
	game.render.mk.push(ims["mk_BAR"]);
	game.render.mk.push(ims["mk_BEL"]);

	game.tati[0] = [];
	game.tati[1] = [];
	game.tati[2] = [];
	game.tati[0].push(ims["tati0_0"]);
	game.tati[0].push(ims["tati0_1"]);
	game.tati[1].push(ims["tati1_0"]);
	game.tati[1].push(ims["tati1_1"]);
	game.tati[1].push(ims["tati1_2"]);
	game.tati[2].push(ims["tati2_0"]);
	

	game.render.slot = ims["slot"];
}

class Game{
	constructor(){
		this.render = {};
		this.render.s1=[];
		this.render.mb=[];
		this.render.mk=[];
		this.tati = {};

		this.money = 1480;

		this.state=0;

		this.slotBib=10;

		this.slotMs=[0,0,0];

		this.tatiStat={};
		this.tatiStat.id=0;
		this.tatiStat.type=1;
		this.tatiStat.loop=100;

		this.roolCount=0;
		this.roolHis = [];

		this.nextTatiC=3;
	}

	mouseMoved(e){
		let GX = mouseX*(0.8675925925925926/MS);
		let GY = mouseY*(0.8675925925925926/MS);
		if(this.tatiStat.id==0){
			let x = GX-1177;
			let y = GY-300+103;
			this.tatiStat.type=1;
			if(x*x+y*y<80**2){
				this.tatiStat.type=0;
			}
		}

		if(this.tatiStat.id==1){
			let x = GX-1177;
			let y = GY-300+103;;
			this.tatiStat.type=0;
			if(x*x+y*y<80**2){
				this.tatiStat.type=0;
				this.tatiStat.id=0;
				console.log(1)
			}
		}

		if(this.tatiStat.id==2){
			let x = GX-1649;
			let y = GY-453+103;;
			this.tatiStat.type=0;
			if(x*x+y*y<600**2){
				this.tatiStat.type=1;
				console.log(1)
			}
		}

	}

	mouseClicked(d){//103
		let GX = mouseX*(0.8675925925925926/MS);
		let GY = mouseY*(0.8675925925925926/MS);
		let C = frameCount%24
		console.log(C)
		if(this.state==0){//ればー
			let x = GX-955;
			let y = GY-547+103;
			if(x*x+y*y<30**2){
				this.state=1;
				so["st"].play()
				this.slotMs[0]=-1;
				this.slotMs[1]=-1;
				this.slotMs[2]=-1;

				this.money-=10;
			}
		}
		if(this.state==1){
			let x = GX-438;
			let y = GY-617+103;
			if(x*x+y*y<70**2){
				this.state=2;
				so["sp"].play()

				this.slotMs[0]=this.random(5);
			}
		}
		if(this.state==2){
			let x = GX-607;
			let y = GY-617+103;
			if(x*x+y*y<70**2){
				this.state=3;
				so["sp"].play()

				this.slotMs[1]=this.random(5);
			}
		}
		if(this.state==3){
			let x = GX-768;
			let y = GY-617+103;
			if(x*x+y*y<70**2){
				this.state=0;
				
				this.onSlotStoped();
				so["sp"].play();

				this.slotMs[2]=this.random(5);
				if(this.checkM()){
					this.nextTatiC-=2;
					this.money+=500;
					if(this.slotMs[0]==0){
						this.state=5;
						setTimeout(()=>{
							this.nextTatiC-=10;
							so["jack"].play();
							so["jack"].onended(()=>{this.state=0});
						},200)
						
					}else{
						this.state=4;
						setTimeout(()=>{
							so["ata"].play();
							so["ata"].onended(()=>{this.state=0});
						},200)
					}
				}
			}
		}
	}

	renderL1(){
		let t = floor(frameCount/2)%3;
		
		image(this.render.s1[t], 0, 0, width, height);
	}

	renderMks(){
		let t = this.slotMs;
		push()
		scale(MS,MS)
		translate(435, 490);
		for(let i=0;i<3;i++){
			let mInd = t[i];
			if(mInd!=-1)image(this.render.mk[t[i]], 0, 0, 160, 200);
			translate(160+30,0);
		}
		
		pop()
	}

	renderSlot(){
		if(this.state==0){//通常
			this.renderMks()
			image(this.render.slot, 0, 0, width, height);
		}

		if(this.state==1|this.state==2|this.state==3){//回転中
			let tx = noise(frameCount/2)*4;
			let ty = noise(frameCount/2,10)*this.slotBib;
			image(this.render.mb[frameCount%3], 0-tx, 0-ty, width+tx/4, height+ty);

			this.renderMks()

			image(this.render.slot, 0-tx, 0-ty, width+tx/4, height+ty);
		}

		if(this.state==4|this.state==5){
			image(this.render.mb[frameCount%3], 0, 0, width, height);
			this.renderMks()
			image(this.render.slot, 0, 0, width, height);
		}
	}

	renderTati(){
		push()

		if(this.tatiStat.id==0){
			let t = this.tatiStat.type
			if(frameCount%this.tatiStat.loop==0){
				this.tatiStat.loop=floor(random(50)+200);
				t=0;
			}
			
			image(this.tati[0][t], 0, 0, width, height);
		}
		if(this.tatiStat.id==1){
			image(this.tati[0][0], 0, 0, width, height);
		}
		if(this.tatiStat.id==2){
			let l=70;
			if(this.tatiStat.type==1)l=6;
			let t = floor(frameCount/2)%l;
			t = max(t-l+3,0);

			

			image(this.tati[1][t], 0, 0, width, height);
		}
		if(this.tatiStat.id==3){
			let t = floor(frameCount/2)%70;
			t = max(t-70+3,0);
			image(this.tati[2][0], 0, 0, width, height);
			this.renderSlot();
		}
		pop()
	}

	renderMoney(){
		push()
			fill(0,0,0);
  			textFont(anzuFont);
  			textSize(40);
  			text(`おかね:＄${this.money}`, 20, 40);
		pop()
	}

	random(N){
		let t = frameCount/12;
		t = floor(Math.abs(t));
		return t%N;

	}

	onSlotStoped(){
		this.nextTatiC--;
		if(this.nextTatiC<=0){
			this.nextTatiC=5
			this.tatiStat.id = frameCount%4
			if(this.tatiStat.id==2)this.nextTatiC=10;
		}
		
	}

	checkM(){
		return this.slotMs[0]==this.slotMs[1]&&this.slotMs[1]==this.slotMs[2];
	}

	draw(){
		this.renderSlot();
		this.renderTati();
		this.renderL1();
		this.renderMoney();
	}
}

function setup() {
	createCanvas(windowHeight*16/9, windowHeight);
	MS = height/1080
	frameRate(24)
}

function draw() {
	//translate(-width/2,-height/2)
	background(255,245,245);
	game.draw();
	
}

function mouseMoved(e){
	game.mouseMoved(e);
}

function mouseClicked(e){
	game.mouseClicked(e)
	console.log(e)
}