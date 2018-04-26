/**
 * 单例模式基类
 */
class Singleton
{
    //其实实际的开发项目中，不一定会用到数组，有可能会把数组之类的进行封装
    /** 存放初始化过的构造函数,这里用数组来存放构造函数 **/
    private static clsKey:Function[] = [];
    private static clsVal:any[] = [];

    constructor()
    {
        var cls:any = this["constructor"];

        if (!cls) {
            return
        }

        // 防止重复实例化
        if (Singleton.clsKey.indexOf(cls) != -1) {
            throw new Error(this + " only can be new once!");
        } else {
            Singleton.clsKey.push(cls);
            Singleton.clsVal.push(this);
        }
    }

    private static _instance:Singleton;
    public static getInstance():Singleton
    {
        if (!this._instance) {
            this._instance = new Singleton();
        }
        return this._instance;
    }

    destroy(param?:any):void 
    {
        this.onDestroy();
        Singleton.removeInstance(this["constructor"]);
    }

    protected onDestroy():void 
    {

    }

    static removeInstance(cls:Function):void 
    {
        let idx:number = this.clsKey.indexOf(cls);

        if (idx == -1) {
            return;
        }

        this.clsKey.splice(idx, 1);
        this.clsVal.splice(idx, 1);
    }

    static checkFunValue(clazz: Function):any
    {
        let funs:Function[] = this.clsKey;
        let length:number = funs.length;
        for(let i:number = 0; i < length; i++)
        {
            if(clazz == funs[i])
                return this.clsVal[i];
        }
        return null;
    }

    /**
     * 获取单例类，若不存在则创建.所有的单例创建的时候，都必须使用这个方法来创建，这样可以做到统一管理单例
     * @param cls 
     */
    static getInstanceOrCreate(cls:any):any
    {
        let obj:any = this.checkFunValue(cls);
        if (obj) {
            return obj;
        }

        obj = new cls();
        //不是Singleton的子类，则手动添加Singleton构造器会自动添加到classMap
        if (!(obj instanceof Singleton)) {
            this.clsKey.push(cls);
            this.clsVal.push(obj);
        }
        return obj;
    }
}