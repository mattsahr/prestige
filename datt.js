var d = [ 
    "AIzaS", "c6QbF", "n3is2", "cdDIB", "cmjES", // 0
    "yAfMg", "BULCf", "Z3jqR", "Kx5t1", "2fw5y", "VAP5W", // 5
    "66gEG", "Ome3z", "1DOTR", "ZQAsQ", // 11
    "LITzx", "WjpRy", "KnwdB", "NUugc", "SMPix", "BiIvL", "LWg0B", "WuLdE", // 15
    "4X0vR",  "4rxWE", "OvL66", "ytQvf", "KxDf5", "qPutM", "naTfT", // 23
    "wGbjR", "iwQAF", "feZnU", // 30
    "DXHF4", "kmTXP", "arpqi", "qtB5G", "4Jowk", // 33
    "7i6E", "wRn0R", "KuoQ6", "cuQfA", "T4hmF", "M0kCB", // 38
    "aUtITQ", "O6auZ", "3pJn0r", "NUuxc", "ytivf", "OmK3z", "LITzx", "LWgeB", "fyZnU"
];

export const makeField = () => {
    return (d[44][0] + d[46][1] + d[48][2] + d[49][2] + d[51][3] + d[52][1]);
};

export const makeKey = () => {
    return d[0] + d[1+4] + d[11] + d[10+5] + d[23]  + d[20 + 10] + d [33] + d[38];
};

export const API_KEY = makeKey();
