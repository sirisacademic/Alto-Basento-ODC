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