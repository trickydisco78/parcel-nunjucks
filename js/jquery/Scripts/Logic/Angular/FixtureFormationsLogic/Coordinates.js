var x = {
    'left': 15,
    'right': 279,
    'centre': 147,
    'centreCentreLeft': 86,
    'centreLeftLeft': 60,
    'centreLeft': 105,
    'centreCentreRight': 211,
    'centreRightRight': 229,
    'centreRight' : 187
};

var y = {
    'gk': 270,
    'd5': 205, //d for 5 row formation
    'd': 195,
    'dml5': 160, //dm for 5 row formation (lower quadrant)
    'dmt5': 120, //dm for 5 row formation (top quadrant)
    'dm': 140,
    'm': 110,
    'am5': 70, //am for 5 row formation
    'am': 80,
    'f': 18
};

var formations = {};

formations[4231] = {
    1: {
        'x': x.centre,
        'y': y.gk
    },
    2: {
        'x': x.left,
        'y': y.d + 15
    },
    3: {
        'x': x.centreLeft,
        'y': y.d + 15
    },
    4: {
        'x': x.centreRight,
        'y': y.d + 15
    },
    5: {
        'x': x.right,
        'y': y.d + 15
    },
    6: {
        'x': x.centreLeft,
        'y': y.dm
    },
    7: {
        'x': x.centreRight,
        'y': y.dm
    },
    8: {
        'x': x.left,
        'y': y.am
    },
    9: {
        'x': x.centre,
        'y': y.am
    },
    10: {
        'x': x.right,
        'y': y.am
    },
    11: {
        'x': x.centre,
        'y': y.f
    }
};

formations[4321] = {
    1: {
        'x': x.centre,
        'y': y.gk
    },
    2: {
        'x': x.left,
        'y': y.d
    },
    3: {
        'x': x.centreLeft,
        'y': y.d
    },
    4: {
        'x': x.centreRight,
        'y': y.d
    },
    5: {
        'x': x.right,
        'y': y.d
    },
    6: {
        'x': x.centreLeftLeft,
        'y': y.dm - 15
    },
    7: {
        'x': x.centre,
        'y': y.dm - 15
    },
    8: {
        'x': x.centreRightRight,
        'y': y.dm - 15
    },
    9: {
        'x': x.left,
        'y': y.am - 15
    },
    10: {
        'x': x.right,
        'y': y.am - 15
    },
    11: {
        'x': x.centre,
        'y': y.f
    }
};

formations[442] = {
    1: {
        'x': x.centre,
        'y': y.gk
    },
    2: {
        'x': x.left,
        'y': y.d
    },
    3: {
        'x': x.centreLeft,
        'y': y.d
    },
    4: {
        'x': x.centreRight,
        'y': y.d
    },
    5: {
        'x': x.right,
        'y': y.d
    },
    6: {
        'x': x.left,
        'y': y.m
    },
    7: {
        'x': x.centreLeft,
        'y': y.m
    },
    8: {
        'x': x.centreRight,
        'y': y.m
    },
    9: {
        'x': x.right,
        'y': y.m
    },
    10: {
        'x': x.centreCentreLeft,
        'y': y.f
    },
    11: {
        'x': x.centreCentreRight,
        'y': y.f
    }
};

formations[4411] = {
    1: {
        'x': x.centre,
        'y': y.gk
    },
    2: {
        'x': x.left,
        'y': y.d
    },
    3: {
        'x': x.centreLeft,
        'y': y.d
    },
    4: {
        'x': x.centreRight,
        'y': y.d
    },
    5: {
        'x': x.right,
        'y': y.d
    },
    6: {
        'x': x.left,
        'y': y.m
    },
    7: {
        'x': x.centreLeft,
        'y': y.m
    },
    8: {
        'x': x.centreRight,
        'y': y.m
    },
    9: {
        'x': x.right,
        'y': y.m
    },
    10: {
        'x': x.centre,
        'y': y.am
    },
    11: {
        'x': x.centre,
        'y': y.f
    }
};

formations[433] = {
    1: {
        'x': x.centre,
        'y': y.gk
    },
    2: {
        'x': x.left,
        'y': y.d
    },
    3: {
        'x': x.centreLeft,
        'y': y.d
    },
    4: {
        'x': x.centreRight,
        'y': y.d
    },
    5: {
        'x': x.right,
        'y': y.d
    },
    6: {
        'x': x.centreLeftLeft,
        'y': y.m
    },
    7: {
        'x': x.centre,
        'y': y.m
    },
    8: {
        'x': x.centreRightRight,
        'y': y.m
    },
    9: {
        'x': x.centreLeftLeft,
        'y': y.f
    },
    10: {
        'x': x.centre,
        'y': y.f
    },
    11: {
        'x': x.centreRightRight,
        'y': y.f
    }
};

formations[451] = {
    1: {
        'x': x.centre,
        'y': y.gk
    },
    2: {
        'x': x.left,
        'y': y.d
    },
    3: {
        'x': x.centreLeft,
        'y': y.d
    },
    4: {
        'x': x.centreRight,
        'y': y.d
    },
    5: {
        'x': x.right,
        'y': y.d
    },
    6: {
        'x': x.left,
        'y': y.m
    },
    7: {
        'x': x.centreCentreLeft,
        'y': y.m
    },
    8: {
        'x': x.centre,
        'y': y.m
    },
    9: {
        'x': x.centreCentreRight,
        'y': y.m
    },
    10: {
        'x': x.right,
        'y': y.m
    },
    11: {
        'x': x.centre,
        'y': y.f
    }
};

formations[352] = {
    1: {
        'x': x.centre,
        'y': y.gk
    },
    2: {
        'x': x.centreLeftLeft,
        'y': y.d
    },
    3: {
        'x': x.centre,
        'y': y.d
    },
    4: {
        'x': x.centreRightRight,
        'y': y.d
    },
    5: {
        'x': x.left,
        'y': y.m
    },
    6: {
        'x': x.centreCentreLeft,
        'y': y.m
    },
    7: {
        'x': x.centre,
        'y': y.m
    },
    8: {
        'x': x.centreCentreRight,
        'y': y.m
    },
    9: {
        'x': x.right,
        'y': y.m
    },
    10: {
        'x': x.centreLeft,
        'y': y.f
    },
    11: {
        'x': x.centreRight,
        'y': y.f
    }
};

formations[4141] = {
    1: {
        'x': x.centre,
        'y': y.gk
    },
    2: {
        'x': x.left,
        'y': y.d
    },
    3: {
        'x': x.centreLeft,
        'y': y.d
    },
    4: {
        'x': x.centreRight,
        'y': y.d
    },
    5: {
        'x': x.right,
        'y': y.d
    },
    6: {
        'x': x.centre,
        'y': y.dm
    },
    7: {
        'x': x.left,
        'y': y.am
    },
    8: {
        'x': x.centreLeft,
        'y': y.am
    },
    9: {
        'x': x.centreRight,
        'y': y.am
    },
    10: {
        'x': x.right,
        'y': y.am
    },
    11: {
        'x': x.centre,
        'y': y.f
    }
};

formations[343] = {
    1: {
        'x': x.centre,
        'y': y.gk
    },
    2: {
        'x': x.centreLeftLeft,
        'y': y.d
    },
    3: {
        'x': x.centre,
        'y': y.d
    },
    4: {
        'x': x.centreRightRight,
        'y': y.d
    },
    5: {
        'x': x.left,
        'y': y.m
    },
    6: {
        'x': x.centreLeft,
        'y': y.m
    },
    7: {
        'x': x.centreRight,
        'y': y.m
    },
    8: {
        'x': x.right,
        'y': y.m
    },
    9: {
        'x': x.centreLeftLeft,
        'y': y.f
    },
    10: {
        'x': x.centre,
        'y': y.f
    },
    11: {
        'x': x.centreRightRight,
        'y': y.f
    }
};

formations[41212] = {
    1: {
        'x': x.centre,
        'y': y.gk
    },
    2: {
        'x': x.left,
        'y': y.d5
    },
    3: {
        'x': x.centreLeft,
        'y': y.d5
    },
    4: {
        'x': x.centreRight,
        'y': y.d5
    },
    5: {
        'x': x.right,
        'y': y.d5
    },
    6: {
        'x': x.centre,
        'y': y.dml5
    },
    7: {
        'x': x.centreLeft,
        'y': y.dmt5
    },
    8: {
        'x': x.centreRight,
        'y': y.dmt5
    },
    9: {
        'x': x.centre,
        'y': y.am5
    },
    10: {
        'x': x.centreLeft,
        'y': y.f
    },
    11: {
        'x': x.centreRight,
        'y': y.f
    }
};



function _modifyFormationData() {
    for (var prop in formations) {
        for (var i = 1, l = Object.keys(formations[prop]).length; i < l; i++) {
            formations[prop][i].y = _modifyCoordinatesY(formations[prop][i].y);
            formations[prop][i].x = _modifyCoordinatesX(formations[prop][i].x);
        }
    }
}


function _modifyCoordinatesX(x) {
    if (x > 147) {
        x = 147 + ((x - 147) * 0.85);
        return x;
    } else if (x < 147) {
        x = 147 - ((147 - x) * 0.90);
        return x;
    }
    return x;
}


function _modifyCoordinatesY(y) {
    y = 270 - ((270 - y) * 0.8);
    return y;
}

function _getFormationsJSON() {
    return JSON.stringify(formations);
}

// run
_modifyFormationData();