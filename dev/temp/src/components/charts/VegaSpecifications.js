import topojson from '../../static/basilicata_map.topo.json'

export const specSavingByCategory = {
    "$schema": "https://vega.github.io/schema/vega/v4.json",
    "width": 200,
    "height": 200,
    "padding": 5,
  
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
        "domain": false,
        "orient": "bottom",
        "tickCount": 5,
        "title": "Average ribasaso"
      },
      {
        "scale": "y",
        "grid": true,
        "domain": false,
        "orient": "left",
        "titlePadding": 5,
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
    "width": 200,
    "height": 200,
    "padding": 5,
  
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
        "format": "$,d",
        "tickCount": 5
      },
      {
        "scale": "y",
        "orient": "left"
      }
    ],
  
    "marks": [
      {
        "type": "rect",
        "from": {"data": "source"},
        "encode": {
          "update": {
            "x": {"scale": "x", "value": 0},
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
          }
        }
      }
    ]
  };

export const specOrgsByMunicipality = {
  "$schema": "https://vega.github.io/schema/vega/v4.json",
  "width": 900,
  "height": 560,
  "padding": {
    "top": 25,
    "left": 0,
    "right": 0,
    "bottom": 0
  },
  "autosize": "none",
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
              "values" : ["count"],
              "as" : ["count"],
              "default" : 0
          },
          {
              "type" : "extent",
              "field" : "count",
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
      "title": "Number of tenders"
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
                    "signal": "datum.count"
                    }
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
                    "test" : "datum.count > 0",
                    "scale": "color",
                    "field" : "count"
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
                  "value": 1
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
  "width": 800,
  "height": 500,
  "padding": 15,
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
          "fillOpacity" : { "value" : 0.7}
        }
      }
    }
  ]
};