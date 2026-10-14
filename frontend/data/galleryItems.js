const galleryItems = [
    // === MODEL SHOOT ===
    { id: "m1", type: "image", src: "assets/MODEL SHOOT/62.jpg", category: "model", active: true },
    { id: "m2", type: "image", src: "assets/MODEL SHOOT/IMG_0284.JPG", category: "model", active: true },
    { id: "m3", type: "image", src: "assets/MODEL SHOOT/IMG_0336.JPG", category: "model", active: true },
    { id: "m4", type: "image", src: "assets/MODEL SHOOT/IMG_0740.JPG", category: "model", active: true },
    { id: "m5", type: "image", src: "assets/MODEL SHOOT/IMG_6925.JPG", category: "model", active: true },
    { id: "m6", type: "image", src: "assets/MODEL SHOOT/IMG_6978.JPG", category: "model", active: true },

    // === WEDDING ===
    { id: "w2", type: "image", src: "assets/WEDDING/-GUNJAN STUDIO  9669036747 (5).JPG", category: "wedding", active: true },
    { id: "w3", type: "image", src: "assets/WEDDING/GUNJAN STUDIO 9669036747 (19).jpg", category: "wedding", active: true },
    { id: "w4", type: "image", src: "assets/WEDDING/GUNJAN STUDIO 9669036747 (3).jpg", category: "wedding", active: true },
    { id: "w5", type: "image", src: "assets/WEDDING/P2677644.JPG", category: "wedding", active: true },
    { id: "w6", type: "image", src: "assets/WEDDING/P2677677.JPG", category: "wedding", active: true },
    { id: "w7", type: "image", src: "assets/WEDDING/-GUNJAN STUDIO  9669036747 (10).jpg", category: "wedding", active: true },
    { id: "w8", type: "image", src: "assets/WEDDING/P2677683.JPG", category: "wedding", active: true },
    { id: "w9", type: "image", src: "assets/WEDDING/P2677688.JPG", category: "wedding", active: true },

    // === CANDID WEDDING ===
    { id: "c1", type: "image", src: "assets/CANDIT WEDDING SHOOT/GUNJAN STUDIO  9669036747 (1).jpg", category: "candid", active: true },
    { id: "c2", type: "image", src: "assets/CANDIT WEDDING SHOOT/GUNJAN STUDIO  9669036747 (5).jpg", category: "candid", active: true },
    { id: "c3", type: "image", src: "assets/CANDIT WEDDING SHOOT/GUNJAN STUDIO 9669036747 (17).jpg", category: "candid", active: true },
    { id: "c4", type: "image", src: "assets/CANDIT WEDDING SHOOT/GUNJAN STUDIO 9669036747 (4).jpg", category: "candid", active: true },
    { id: "c5", type: "image", src: "assets/CANDIT WEDDING SHOOT/GUNJAN STUDIO 9669036747 (7).jpg", category: "candid", active: true },
    { id: "c6", type: "image", src: "assets/CANDIT WEDDING SHOOT/IMG_0863.JPG", category: "candid", active: true },
    { id: "c7", type: "image", src: "assets/CANDIT WEDDING SHOOT/P2677629.JPG", category: "candid", active: true },
    { id: "c8", type: "image", src: "assets/CANDIT WEDDING SHOOT/P2677648.JPG", category: "candid", active: true },
    { id: "c9", type: "image", src: "assets/CANDIT WEDDING SHOOT/P2677660.JPG", category: "candid", active: true },
    { id: "c10", type: "image", src: "assets/CANDIT WEDDING SHOOT/P2677732.JPG", category: "candid", active: true },

    // === BRIDAL ===
    { id: "b1", type: "image", src: "assets/BRIDAL/-GUNJAN STUDIO  9669036747 (9).jpg", category: "bridal", active: true },
    { id: "b2", type: "image", src: "assets/BRIDAL/012.jpg", category: "bridal", active: true },
    { id: "b3", type: "image", src: "assets/BRIDAL/GUNJAN STUDIO  9669036747 (9).jpg", category: "bridal", active: true },
    { id: "b4", type: "image", src: "assets/BRIDAL/GUNJAN STUDIOI 9669036747  MAHESH PAL - (15).JPG", category: "bridal", active: true },
    { id: "b5", type: "image", src: "assets/BRIDAL/P2656625.JPG", category: "bridal", active: true },
    { id: "b6", type: "image", src: "assets/BRIDAL/P2656631.JPG", category: "bridal", active: true },
    { id: "b7", type: "image", src: "assets/BRIDAL/P2656653.JPG", category: "bridal", active: true },
    { id: "b8", type: "image", src: "assets/BRIDAL/P2656705.JPG", category: "bridal", active: true },
    { id: "b9", type: "image", src: "assets/BRIDAL/gunjan studio (88).jpg", category: "bridal", active: true },
    { id: "b10", type: "image", src: "assets/BRIDAL/gunjan studio (96).jpg", category: "bridal", active: true },

    // === PRE-WEDDING ===
    { id: "pw1", type: "image", src: "assets/PRE WEDDING SHOOT/DJI_0726.JPG", category: "prewedding", active: true },
    { id: "pw2", type: "image", src: "assets/PRE WEDDING SHOOT/DJI_0731.JPG", category: "prewedding", active: true },
    { id: "pw3", type: "image", src: "assets/PRE WEDDING SHOOT/DJI_0833.JPG", category: "prewedding", active: true },
    { id: "pw4", type: "image", src: "assets/PRE WEDDING SHOOT/DJI_0835.JPG", category: "prewedding", active: true },
    { id: "pw5", type: "image", src: "assets/PRE WEDDING SHOOT/GUNJAN STUDIO 9669036747 (18).jpg", category: "prewedding", active: true },
    { id: "pw6", type: "image", src: "assets/PRE WEDDING SHOOT/GUNJAN STUDIO 9669036747 (20).jpg", category: "prewedding", active: true },
    { id: "pw7", type: "image", src: "assets/PRE WEDDING SHOOT/GUNJAN STUDIO 9669036747 (21).jpg", category: "prewedding", active: true },

    // === ENGAGEMENT ===
    { id: "e1", type: "image", src: "assets/Engagement/GUNJAN STUDIO 9669036747  MAHESH PAL  (12).jpg", category: "portrait", active: true },
    { id: "e2", type: "image", src: "assets/Engagement/GUNJAN STUDIO 9669036747 (1).jpg", category: "portrait", active: true },
    { id: "e3", type: "image", src: "assets/Engagement/GUNJAN STUDIO 9669036747 (2).jpg", category: "portrait", active: true },
    { id: "e4", type: "image", src: "assets/Engagement/GUNJAN STUDIO 9669036747 mahesh pal (5).jpg", category: "portrait", active: true },

    // === OUTDOOR ===
    { id: "o1", type: "image", src: "assets/OUTDOOR SHOOT/DSC_0394.jpg", category: "outdoor", active: true },
    { id: "o2", type: "image", src: "assets/OUTDOOR SHOOT/DSC_0399 (1).jpg", category: "outdoor", active: true },
    { id: "o3", type: "image", src: "assets/OUTDOOR SHOOT/DSC_0478.jpg", category: "outdoor", active: true },
    { id: "o4", type: "image", src: "assets/OUTDOOR SHOOT/P2656451.JPG", category: "outdoor", active: true },
    { id: "o5", type: "image", src: "assets/OUTDOOR SHOOT/P2656471.JPG", category: "outdoor", active: true },
    { id: "o6", type: "image", src: "assets/OUTDOOR SHOOT/P2656481.JPG", category: "outdoor", active: true },

    // === BABY SHOOT ===
    { id: "bs1", type: "image", src: "assets/BABY SHOOT/DSC_2192.JPG", category: "baby", active: true },
    { id: "bs2", type: "image", src: "assets/BABY SHOOT/DSC_8857.JPG", category: "baby", active: true },
    { id: "bs3", type: "image", src: "assets/BABY SHOOT/GUNJAN STUDIO 9669036747 MAHESH PAL  SMART CITY GWALIOR (14).JPG", category: "baby", active: true },
    { id: "bs4", type: "image", src: "assets/BABY SHOOT/GUNJAN STUDIO 9669036747 MAHESH PAL  SMART CITY GWALIOR (30).JPG", category: "baby", active: true },
    { id: "bs5", type: "image", src: "assets/BABY SHOOT/GUNJAN STUDIO 9669036747 MAHESH PAL  SMART CITY GWALIOR (34).JPG", category: "baby", active: true },
];

export default galleryItems;
