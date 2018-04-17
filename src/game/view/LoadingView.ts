/**
* loading界面 
*/
module Game{
	export class LoadingView extends ui.ui_loadingUI {

		constructor() 
		{
			super();
			this.init();
		}

		init():void 
		{
			this.txtProgress.text = "";
		}

		load():void 
		{

		}
	}
}