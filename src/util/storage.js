var storage = {
  setStorageSync:function(obj){
    for(var key of obj){
      console.log(key);
      wx.setStorageSync(key,obj[key]); 
    }
  }
};
exports = module.exports = storage;
