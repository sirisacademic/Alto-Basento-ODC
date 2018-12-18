import topojson from '../../static/basilicata_map.topo.json'

// some specific settings like data, title,
// width/height, and padding are set dynamically
// by the React Component rendering the vega
// specification
export const specSavingByCategory = {
    "$schema": "https://vega.github.io/schema/vega/v4.json",
    "autosize" : "fit",
    "data": [
      {
        "name": "source",
        "values" : []
      }
    ],
  
    "scales": [
      {
        "name": "x",
        "type": "linear",
        "round": true,
        "nice": true,
        "zero": true,
        "domain": {"data": "source", "field": "average_ribasso"},
        "range": "width"
      },
      {
        "name": "y",
        "type": "linear",
        "round": true,
        "nice": true,
        "zero": true,
        "domain": {"data": "source", "field": "average_amount"},
        "range": "height"
      },
      {
        "name": "size",
        "type": "linear",
        "round": true,
        "nice": false,
        "zero": true,
        "domain": {"data": "source", "field": "sum_amount"},
        "range": [4,361]
      }
    ],
  
    "axes": [
      {
        "scale": "x",
        "grid": true,
        "gridDash" : [2, 2],
        "domain": false,
        "orient": "bottom",
        "tickCount": 5,
        "title": "Average ribasaso",
        "titlePadding" : 15,
        "format" : "%"
      },
      {
        "scale": "y",
        "grid": true,
        "gridDash" : [2, 2],
        "domain": false,
        "orient": "left",
        "titlePadding": 15,
        "title": "Average amount"
      }
    ],
  
    "marks": [
      {
        "name": "marks",
        "type": "symbol",
        "from": {"data": "source"},
        "encode": {
          "update": {
            "x": {"scale": "x", "field": "average_ribasso"},
            "y": {"scale": "y", "field": "average_amount"},
            "size": {"scale": "size", "field": "sum_amount"},
            "shape": {"value": "circle"},
            "strokeWidth": {"value": 2},
            "opacity": {"value": 0.5},
            "stroke": {"value": "#4682b4"},
            "fill": {"value": "transparent"}
          }
        }
      }
    ]
  };


export const specRankByAmount = {
    "$schema": "https://vega.github.io/schema/vega/v4.json",
    "autosize" : "fit",
    "padding": 5,
    "signals" : [
      {
        "name" : "baseline",
        "value" : "middle"
      }
    ],
    "data": [
      {
        "name": "source",
        "values" : [],
        "transform" : [
            {
                "type" : "window",
                "sort" : {
                    "field" : "sum_amount",
                    "order" : "descending"
                },
                "ops" : ["row_number"],
                "as" : ["rank"]
            },
            {
                "type" : "filter",
                "expr" : "datum.rank <= 15"
            },
            {
                "type" : "collect",
                "sort" : {
                    "field" : "sum_amount",
                    "order" : "descending"
                }
            }
        ]
      }
    ],
  
    "scales": [
      {
        "name": "x",
        "type": "linear",
        "domain": {"data": "source", "field": "sum_amount"},
        "range": "width",
        "nice" : true
      },
      {
        "name": "y",
        "type": "band",
        "domain": {
            "data": "source", 
            "field": "[organizationReference.legalName]"
        },
        "range": "height",
        "padding": 0.1
      }
    ],
  
    "axes": [
      {
        "scale": "x",
        "orient": "bottom",
        "format": "$,.2r",
        "tickCount": 3,
        "tickExtra" : false,
        "grid": true,
        "gridDash" : [2, 2],
        "title": "Total amount",
        "titlePadding" : 15,
      },
      {
        "scale": "y",
        "orient": "left",
        "labels" : false,
        "domain" : false,
        "ticks" : false
      }
    ],
  
    "marks": [
      {
        "type": "rect",
        "from": {"data": "source"},
        "encode": {
          "enter" : {
            "fill" : {
              "value" : "rgb(105, 255, 218)"
            },
            "stroke" : {
              "value" : "rgb(95, 204, 177)"
            },
            "strokeWidth" : {
              "value" : 0.5
            },
            "cursor" : {
              "value" : "pointer"
            },
            "tooltip": {
              "signal": "{'Total amount' : format(datum.sum_amount, '$,.0f') }"
            }
          },
          "update": {
            "x": {  "value": 2 },
            "x2" : {
                "scale" : "x",
                "field" : "sum_amount"
            },
            "y": {
                "scale": "y", 
                "field": "[organizationReference.legalName]"
            },
            "height": {
                "scale": "y",
                "band" : 1
            }
          },
          "hover" : {
            "fill" : {
              "value" : "red"
            }
          }
        }
      },
      {
        "type" : "text",
        "from" : {
          "data" : "source"
        },
        "encode" : {
          "enter" : {
            "text" : {
              "field": "[organizationReference.legalName]"
            },
            "x" : {
              "value" : 10
            },
            "y" : {
              "scale" : "y",
              "field": "[organizationReference.legalName]",
              "band" : 0.5
            },
            "baseline" : {
              "value" : "middle"
            }
          }
        }        
      }
    ]
  };

export const specOrgsByMunicipality = {
  "$schema": "https://vega.github.io/schema/vega/v4.json",
  "autosize" : "fit",
  "padding": {
    "top": 25,
    "left": 0,
    "right": 0,
    "bottom": 0
  },
  "data": [
    {
        "name" : "data",
        "values" : []
    },
    {
      "name": "basilicata_map",
      "values": topojson,
      "format": {
        "type": "topojson",
        "feature": "basilicata_map"
      },
      "transform" : [
          {
              "type": "lookup",
              "from" : "data", 
              "key" : "organizationReference\\.address\\.municipality",
              "fields" : ["properties.\\NAME_3"],
              "values" : ["distinct_org", "distinct_id"],
              "as" : ["distinct_org", "distinct_id"],
              "default" : 0
          },
          {
              "type" : "extent",
              "field" : "distinct_org",
              "signal" : "extent"
          }          
      ]
    }
  ],
  "projections": [
    {
      "name": "projection",
      "type": "mercator",
      "fit" : {
        "signal" : "data('basilicata_map')"
      },
      "size" : {
        "signal" : "[width, height]"
      }
    }
  ],
  "scales" : [{
    "name" : "color",
    "type" : "quantize",
    "domain" : {
        "signal" : "extent"
    },
    "range" : {
        "scheme" : "blues",
        "count" : 9
    }
    }],
    "legends": [
    {
      "fill": "color",
      "orient": "bottom-left",
      "title": "Number of Orgs."
    }],
  "marks": [   
    {
      "type": "shape",
      "from": {
          "data": "basilicata_map"
      },
      "encode": {
            "enter": { 
                "tooltip": {
                    "signal": "{'Organizations' : datum.distinct_org, 'Tenders' : datum.distinct_id }"
                    }
                },
                "cursor" : {
                  "value" : "pointer"
                },
          "update": {
              "strokeWidth": {
                  "value": 0.5
              },
              "stroke": {
                  "value": "#bbb"
              },
              "fill": [
                {
                    "test" : "datum.distinct_org > 0",
                    "scale": "color",
                    "field" : "distinct_org"
                },
                {
                    "value" : "#f0f0f0"
                }],
              "zindex": {
                  "value": 0
              }
          },
          "hover": {
              "strokeWidth": {
                  "value": 3
              },
              "stroke": {
                  "value": "firebrick"
              },
              "zindex": {
                  "value": 1
              }
          }
      },
      "transform": [{
          "type": "geoshape",
          "projection": "projection"
      }]
    }
  ]
};

export const specTendersTimeline = {
  "$schema": "https://vega.github.io/schema/vega/v4.json",
  "autosize" : "fit",
  "data" : [
    {      
      "name" : "data",
      "values" : [],
    "transform" : [
      {
              "type" : "extent",
              "field" : "percentageRibasso",
              "signal" : "extent"
          } 
    ]
  }],
  "scales" : [
    {
      "name": "yscale",
      "type": "sqrt",
      "range": [{"signal": "height"}, 0],
      "domain": {"data": "data", "field": "amount"}
    },
    {
      "name" : "xscale",
      "type" : "time",
      "range" : "width",
      "domain" : {
        "data" : "data",
        "fields" :["startDate", "endDate"]
      }
    },
    {
      "name" : "color",
      "type": "quantize",      
      "domain" : {
        "signal" : "extent"
      },
      "range" : {
        "scheme" : "viridis"
      }
    }
  ],
  "legends": [
    {
      "fill": "color",
      "orient": "top-right",
      "title": "Tassa di ribasso",
      "direction" : "horizontal"
    }],
  "axes": [
    {"orient": "bottom", "scale": "xscale"},
    {"orient": "left", "scale": "yscale"}
  ],
  "marks" : [
        {
      "type": "rect",
      "from": {"data": "data"},
      "encode": {
        "enter": {
          "x": {"scale": "xscale", "field": "startDate"},
          "x2": {"scale": "xscale", "field": "endDate"},
          "y": {"scale": "yscale", "field": "amount"},
          "height": {"value": 4},
          "fill": {"scale": "color", "field" : "percentageRibasso"},
          "stroke": { "value" : "black"},
          "strokeOpacity" : { "value": 0.5 },
          "fillOpacity" : { "value" : 0.7},
          "cursor" : {
            "value" : "pointer"
          },
          "tooltip": {
            "signal": "{'Tender' : datum.tenderName, 'Dates' : 'from ' + (month(datum.startDate)+1) + '/' + year(datum.startDate) + ' to ' + (month(datum.endDate)+1) + '/' + year(datum.endDate), 'Ribasso' : datum.percentageRibasso + '%' }"
          }
        }
      }
    }
  ]
};



export const specFlowOrgMunicipality = {
  "$schema": "https://vega.github.io/schema/vega/v3.0.json",
  "height": 2000,
  "width": 700,
  "data": [
    {
      "name": "rawData",
      "values": [],
      "transform": [
        {
          "type": "formula",
          "expr": "datum['organizationReference.legalName']",
          "as": "stk1"
        },
        {
          "type": "formula",
          "expr": "datum.municipality",
          "as": "stk2"
        },
        {
          "type": "formula",
          "expr": "datum.sum_amount",
          "as": "size"
        }
      ]
    },
    {
      "name": "nodes",
      "source": "rawData",
      "transform": [
        {
          "type": "filter",
          "expr": "!groupSelector || groupSelector.stk1 == datum.stk1 || groupSelector.stk2 == datum.stk2"
        },
        {
          "type": "formula",
          "expr": "datum.stk1+datum.stk2",
          "as": "key"
        },
        {
          "type": "fold",
          "fields": [
            "stk1",
            "stk2"
          ],
          "as": [
            "stack",
            "grpId"
          ]
        },
        {
          "type": "formula",
          "expr": "datum.stack == 'stk1' ? datum.stk1+' '+datum.stk2 : datum.stk2+' '+datum.stk1",
          "as": "sortField"
        },
        {
          "type": "stack",
          "groupby": [
            "stack"
          ],
          "sort": {
            "field": "sortField",
            "order": "descending"
          },
          "field": "size"
        },
        {
          "type": "formula",
          "expr": "(datum.y0+datum.y1)/2",
          "as": "yc"
        }
      ]
    },
    {
      "name": "groups",
      "source": "nodes",
      "transform": [
        {
          "type": "aggregate",
          "groupby": [
            "stack",
            "grpId"
          ],
          "fields": [
            "size"
          ],
          "ops": [
            "sum"
          ],
          "as": [
            "total"
          ]
        },
        {
          "type": "stack",
          "groupby": [
            "stack"
          ],
          "sort": {
            "field": "grpId",
            "order": "descending"
          },
          "field": "total"
        },
        {
          "type": "formula",
          "expr": "scale('y', datum.y0)",
          "as": "scaledY0"
        },
        {
          "type": "formula",
          "expr": "scale('y', datum.y1)",
          "as": "scaledY1"
        },
        {
          "type": "formula",
          "expr": "datum.stack == 'stk1'",
          "as": "rightLabel"
        },
        {
          "type": "formula",
          "expr": "datum.total/domain('y')[1]",
          "as": "percentage"
        }
      ]
    },
    {
      "name": "destinationNodes",
      "source": "nodes",
      "transform": [
        {
          "type": "filter",
          "expr": "datum.stack == 'stk2'"
        }
      ]
    },
    {
      "name": "edges",
      "source": "nodes",
      "transform": [
        {
          "type": "filter",
          "expr": "datum.stack == 'stk1'"
        },
        {
          "type": "lookup",
          "from": "destinationNodes",
          "key": "key",
          "fields": [
            "key"
          ],
          "as": [
            "target"
          ]
        },
        {
          "type": "linkpath",
          "orient": "horizontal",
          "shape": "diagonal",
          "sourceY": {
            "expr": "scale('y', datum.yc)"
          },
          "sourceX": {
            "expr": "scale('x', 'stk1') + bandwidth('x')"
          },
          "targetY": {
            "expr": "scale('y', datum.target.yc)"
          },
          "targetX": {
            "expr": "scale('x', 'stk2')"
          }
        },
        {
          "type": "formula",
          "expr": "range('y')[0]-scale('y', datum.size)",
          "as": "strokeWidth"
        },
        {
          "type": "formula",
          "expr": "datum.size/domain('y')[1]",
          "as": "percentage"
        }
      ]
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "band",
      "range": "width",
      "domain": [
        "stk1",
        "stk2"
      ],
      "paddingOuter": 0.05,
      "paddingInner": 0.95
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "domain": {
        "data": "nodes",
        "field": "y1"
      }
    },
    {
      "name": "stackNames",
      "type": "ordinal",
      "range": [
        "Organization",
        "Municipality"
      ],
      "domain": [
        "stk1",
        "stk2"
      ]
    }
  ],
  "axes": [
    {
      "orient": "bottom",
      "scale": "x",
      "domain" : false,
      "ticks" : false,
      "labelPadding" : 20,
      "labelFontSize" : 14,
      "encode": {
        "labels": {
          "update": {
            "text": {
              "scale": "stackNames",
              "field": "value",
              "fontWeight" : "bold"
            }
          }
        }
      }
    },
    {
      "orient": "top",
      "scale": "x",
      "domain" : false,
      "ticks" : false,
      "labelPadding" : 20,
      "labelFontSize" : 14,
      "encode": {
        "labels": {
          "update": {
            "text": {
              "scale": "stackNames",
              "field": "value",
              "fontWeight" : "bold"
            }
          }
        }
      }
    },
    {
      "orient": "left",
      "scale": "y",
      "labels" : false,
      "domain" : false,
      "ticks" : false
    }
  ],
  "marks": [
    {
      "type": "rect",
      "from": {
        "data": "nodes"
      },
      "encode": {
        "enter": {
          "stroke": {
            "value": "#000"
          },
          "strokeWidth": {
            "value": 1
          },
          "width": {
            "scale": "x",
            "band": 1
          },
          "x": {
            "scale": "x",
            "field": "stack"
          },
          "y": {
            "field": "y0",
            "scale": "y"
          },
          "y2": {
            "field": "y1",
            "scale": "y"
          }
        }
      }
    },
    {
      "type": "path",
      "name": "edgeMark",
      "from": {
        "data": "edges"
      },
      "clip": true,
      "encode": {
        "update": {
          "stroke": [
            {
              "test": "groupSelector && groupSelector.stack=='stk1'",
              "value": "blue"
            },
            {
              "value": "grey"
            }
          ],
          "strokeWidth": {
            "field": "strokeWidth"
          },
          "path": {
            "field": "path"
          },
          "strokeOpacity": {
            "signal": "!groupSelector && (groupHover.stk1 == datum.stk1 || groupHover.stk2 == datum.stk2) ? 0.9 : 0.3"
          },
          "zindex": {
            "signal": "!groupSelector && (groupHover.stk1 == datum.stk1 || groupHover.stk2 == datum.stk2) ? 1 : 0"
          },
          "tooltip": {
            "signal": "datum.stk1 + ' → ' + datum.stk2 + '    ' + format(datum.size, ',.0f') + '   (' + format(datum.percentage, '.1%') + ')'"
          }
        },
        "hover": {
          "strokeOpacity": {
            "value": 1
          }
        }
      }
    },
    {
      "type": "rect",
      "name": "groupMark",
      "from": {
        "data": "groups"
      },
      "encode": {
        "enter": {
          "fill": {
            "value": "#192a56"
          },
          "width": {
            "scale": "x",
            "band": 1
          }
        },
        "update": {
          "x": {
            "scale": "x",
            "field": "stack"
          },
          "y": {
            "field": "scaledY0"
          },
          "y2": {
            "field": "scaledY1"
          },
          "fillOpacity": {
            "value": 0.6
          },
          "tooltip": {
            "signal": "datum.grpId + '   ' + format(datum.total, ',.0f') + '   (' + format(datum.percentage, '.1%') + ')'"
          }
        },
        "hover": {
          "fillOpacity": {
            "value": 1
          }
        }
      }
    },
    {
      "type": "text",
      "from": {
        "data": "groups"
      },
      "interactive": false,
      "encode": {
        "update": {
          "x": {
            "signal": "scale('x', datum.stack) + (datum.rightLabel ? bandwidth('x') + 8 : -8)"
          },
          "yc": {
            "signal": "(datum.scaledY0 + datum.scaledY1)/2"
          },
          "align": {
            "signal": "datum.rightLabel ? 'left' : 'right'"
          },
          "baseline": {
            "value": "middle"
          },
          "fontWeight": {
            "value": "bold"
          },
          "text": {
            "signal": "abs(datum.scaledY0-datum.scaledY1) > 13 ? datum.grpId : ''"
          }
        }
      }
    },
    {
      "type": "group",
      "data": [
        {
          "name": "dataForShowAll",
          "values": [
            {}
          ],
          "transform": [
            {
              "type": "filter",
              "expr": "groupSelector"
            }
          ]
        }
      ],
      "encode": {
        "enter": {
          "xc": {
            "signal": "width/2"
          },
          "y": {
            "value": 30
          },
          "width": {
            "value": 80
          },
          "height": {
            "value": 30
          }
        }
      },
      "marks": [
        {
          "type": "group",
          "name": "groupReset",
          "from": {
            "data": "dataForShowAll"
          },
          "encode": {
            "enter": {
              "cornerRadius": {
                "value": 6
              },
              "fill": {
                "value": "#f5f5f5"
              },
              "stroke": {
                "value": "#c1c1c1"
              },
              "strokeWidth": {
                "value": 2
              },
              "height": {
                "field": {
                  "group": "height"
                }
              },
              "width": {
                "field": {
                  "group": "width"
                }
              }
            },
            "update": {
              "opacity": {
                "value": 1
              }
            },
            "hover": {
              "opacity": {
                "value": 0.7
              }
            }
          },
          "marks": [
            {
              "type": "text",
              "interactive": false,
              "encode": {
                "enter": {
                  "xc": {
                    "field": {
                      "group": "width"
                    },
                    "mult": 0.5
                  },
                  "yc": {
                    "field": {
                      "group": "height"
                    },
                    "mult": 0.5,
                    "offset": 2
                  },
                  "align": {
                    "value": "center"
                  },
                  "baseline": {
                    "value": "middle"
                  },
                  "fontWeight": {
                    "value": "bold"
                  },
                  "text": {
                    "value": "Show All"
                  }
                }
              }
            }
          ]
        }
      ]
    }
  ],
  "signals": [
    {
      "name": "groupHover",
      "value": {},
      "on": [
        {
          "events": "@groupMark:mouseover",
          "update": "{stk1:datum.stack=='stk1' && datum.grpId, stk2:datum.stack=='stk2' && datum.grpId}"
        },
        {
          "events": "mouseout",
          "update": "{}"
        }
      ]
    },
    {
      "name": "groupSelector",
      "value": false,
      "on": [
        {
          "events": "@groupMark:click!",
          "update": "{stack:datum.stack, stk1:datum.stack=='stk1' && datum.grpId, stk2:datum.stack=='stk2' && datum.grpId}"
        },
        {
          "events": [
            {
              "type": "click",
              "markname": "groupReset"
            },
            {
              "type": "dblclick"
            }
          ],
          "update": "false"
        }
      ]
    }
  ]
};