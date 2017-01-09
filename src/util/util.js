var util = {
  buildHeader:function(loginInfo,baseHeader){
    var header = {};
    header['content-type'] = !baseHeader?'application/x-www-form-urlencoded':baseHeader;
    for(var key in loginInfo){
      header[key] = loginInfo[key];
    }
    return header;
  }
};
exports = module.exports = util;
