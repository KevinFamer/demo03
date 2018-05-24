module Core {
    /**
     * 单例基类
     */
    export class BaseSingleton
    {
        constructor()
        {
            let cls:any = this["constructor"];
            if (!cls) {
                return;
            }

            // 防止重复实例化
            if (-1 != BaseSingleton.clsKey.indexOf(cls)) {
                throw new Error(this + " 只能被实例化一次!");
            } else {
                BaseSingleton.clsKey.push(cls);
                BaseSingleton.clsVal.push(this);
            }
        }

        create():void 
        {
            this.onCreate();
        }

        destroy(param?:any):void 
        {
            this.onDestroy();
            BaseSingleton.removeInstance(this["constructor"]);
        }

        protected onCreate():void { /** do something... */ }
        protected onDestroy():void { /** do something... */ }



        /** 存放初始化过的构造函数 **/
        private static clsKey:Function[] = [];
        private static clsVal:any[] = [];

        /**
         * 根据参数，从初始化过的构造函数数组中移除
         * @param cls 
         */
        static removeInstance(cls:Function):void 
        {
            let idx:number = this.clsKey.indexOf(cls);
            if (idx == -1) {
                return;
            }
            this.clsKey.splice(idx, 1);
            this.clsVal.splice(idx, 1);
        }

        /**
         * 根据参数，检测是否已在初始化过的构造函数数组中
         * @param cls 
         */
        static checkFunValue(cls:Function):any
        {
            let funs:Function[] = this.clsKey;
            let length:number = funs.length;
            for (let i:number = 0; i < length; i++)
            {
                if (cls == funs[i]) {
                    return this.clsVal[i];
                }
            }
            return undefined;
        }

        /**
         * 获取单例类，若不存在则创建 (所有的单例创建的时候，都必须使用这个方法来创建，这样可以统一管理)
         * @param cls 
         */
        static getInstanceOrCreate(cls:any):any
        {
            let obj:any = this.checkFunValue(cls);
            if (obj != undefined) {
                return obj;
            }

            obj = new cls();
            obj.create();
            
            // 判定如果不是Singleton的子类，则手动添加Singleton构造器会自动添加到classMap
            if (!(obj instanceof BaseSingleton)) {
                this.clsKey.push(cls);
                this.clsVal.push(obj);
            }
            return obj;
        }
    }
}
