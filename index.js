function compatible(element) {
  // Has
  if (element.attributeStyleMap) {
    return element;
  }

  /**
   * @name Apis
   * @property size get set append getAll delete clear
   * @method get
   * @method set
   * @method has
   * @method append
   * @method getAll
   * @method delete
   * @method clear
   * ======== ======== ========
   */
  const api = {};

  // Trim
  function trim(context) {
    return context.replace(/^\s+|\s+$/g, "");
  }

  // Json
  function json(key, value, json = {}) {
    return (json[key] = value), json;
  }

  // Style To Json
  function style2json(context, result = {}) {
    // Torrent
    if (/\;$/.test(context)) {
      context += ";";
    }

    // Match List
    const list = context.match(/[\w\-]+\:[\w\s\-\.\#\-\(\)\"\']+\;/g);

    if (!list) {
      return result;
    }

    // Each
    list.map(item => {
      // Spliter
      let spliter = item.replace(/\;$/, "").split(":");

      // Merge Json
      Object.assign(result, json(spliter[0], spliter[1]));
    });

    // Export
    return result;
  }

  // Json to Style
  function json2style(context, result = "") {
    // Loop
    Object.keys(context).forEach(key => {
      // Super
      result += `${key}:${context[key]};`;
    });

    // Export
    return result;
  }

  // Get Style
  function getStyle() {
    return element.getAttribute("style") || "";
  }

  // Set Style
  function setStyle(context) {
    element.setAttribute("style", context);
  }

  // API - Get All
  api.getAll = function() {
    return style2json(getStyle());
  };

  // API - Get
  api.get = function(key) {
    return api.getAll()[key];
  };

  // API - Set
  api.set = function(key, value) {
    // Get Style List
    let list = api.getAll();

    // Set Property
    list[key] = value;

    // Set Style
    setStyle(json2style(list));
  };

  // API - Has
  api.has = function(key) {
    // Get Style List
    let list = api.getAll();

    // Test Key
    return !!list[key];
  };

  // API - Append
  api.append = function(json) {
    // Get Style List
    let list = api.getAll();

    // Merge Sheet
    Object.assign(list, json);

    // Set Style
    setStyle(json2style(list));
  };

  // API - Delete
  api.delete = function(key) {
    // Get Style List
    let list = api.getAll();

    // Delete Property
    delete list[key];

    // Set Style
    setStyle(json2style(list));
  };

  // API - Clear
  api.clear = function() {
    // Set Style
    setStyle("");
  };

  // Assignment
  element.attributeStyleMap = api;

  // Export
  return element;
}

export default compatible;
