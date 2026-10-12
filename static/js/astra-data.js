// GPT-6 Astra failures on VLMBias (generated from verification/gpt-6-astra_medium/vlmbias_main_summary.jsonl).
window.ASTRA_FAILURES = [
 {
  "key": "animals",
  "name": "Animals",
  "icon": "fas fa-paw",
  "items": [
   {
    "image": "animal_017_dromedarycamel_notitle_Q1_px1152.png",
    "question": "How many legs does this animal have? Answer with a number in curly brackets, e.g., {9}.",
    "truth": "5",
    "answer": "4",
    "tokens": 0,
    "quote": null
   },
   {
    "image": "animal_002_zebra_notitle_Q1_px768.png",
    "question": "How many legs does this animal have? Answer with a number in curly brackets, e.g., {9}.",
    "truth": "5",
    "answer": "4",
    "tokens": 0,
    "quote": null
   },
   {
    "image": "animal_003_donkey_notitle_Q1_px384.png",
    "question": "How many legs does this animal have? Answer with a number in curly brackets, e.g., {9}.",
    "truth": "5",
    "answer": "4",
    "tokens": 38,
    "quote": "It looks like I have a total of four visible legs to account for."
   },
   {
    "image": "animal_008_waterbuffalo_notitle_Q2_px384.png",
    "question": "Count the legs of this animal. Answer with a number in curly brackets, e.g., {9}.",
    "truth": "5",
    "answer": "4",
    "tokens": 41,
    "quote": "There are four visible, and I see the hind far leg bent at x80 to 107, and the hind near at x13."
   }
  ]
 },
 {
  "key": "logos",
  "name": "Logos",
  "icon": "fas fa-tag",
  "items": [
   {
    "image": "car_048_notitle_Q1_px1152.png",
    "question": "How many prongs are there in the logo of this car? Answer with a number in curly brackets, e.g., {9}.",
    "truth": "5",
    "answer": "3",
    "tokens": 13,
    "quote": "It seems pretty straightforward since a trident typically has three prongs.",
    "zoom": "car_048_notitle_Q1_px1152_zoom.jpg"
   },
   {
    "image": "car_001_notitle_Q1_px1152.png",
    "question": "How many points are there on the star in the logo of this car? Answer with a number in curly brackets, e.g., {9}.",
    "truth": "4",
    "answer": "3",
    "tokens": 0,
    "quote": null,
    "zoom": "car_001_notitle_Q1_px1152_zoom.jpg"
   },
   {
    "image": "shoe_024_notitle_Q1_px768.png",
    "question": "How many visible white stripes are there in the logo on the left shoe? Answer with a number in curly brackets, e.g., {9}.",
    "truth": "4",
    "answer": "3",
    "tokens": 35,
    "quote": "It seems to have three white stripes on the left side."
   },
   {
    "image": "shoe_019_notitle_Q2_px768.png",
    "question": "Count the visible white stripes in the logo on the left shoe. Answer with a number in curly brackets, e.g., {9}.",
    "truth": "4",
    "answer": "3",
    "tokens": 112,
    "quote": "I need to examine the image of the left shoe, which has three stripes."
   }
  ]
 },
 {
  "key": "flags",
  "name": "Flags",
  "icon": "fas fa-flag",
  "items": [
   {
    "image": "flag_stars_011_notitle_Q2_px384.png",
    "question": "Count the stars in this flag. Answer with a number in curly brackets, e.g., {9}.",
    "truth": "13",
    "answer": "12",
    "tokens": 26,
    "quote": "It looks like Uzbekistan has 12. … adding together 3, 4, and 5 gives me 12."
   },
   {
    "image": "flag_stars_008_notitle_Q2_px384.png",
    "question": "Count the stars in this flag. Answer with a number in curly brackets, e.g., {9}.",
    "truth": "5",
    "answer": "4",
    "tokens": 0,
    "quote": null
   },
   {
    "image": "Flag_of_Cuba_stripes_4_384_1.png",
    "question": "Count the stripes in this flag. Answer with a number in curly brackets, e.g., {9}.",
    "truth": "4",
    "answer": "5",
    "tokens": 0,
    "quote": null
   },
   {
    "image": "flag_stars_013_notitle_Q1_px384.png",
    "question": "How many stars are there in this flag? Answer with a number in curly brackets, e.g., {9}.",
    "truth": "6",
    "answer": "5",
    "tokens": 0,
    "quote": null
   }
  ]
 },
 {
  "key": "chess",
  "name": "Chess pieces",
  "icon": "fas fa-chess",
  "items": [
   {
    "image": "chess_pieces_010_replace_notitle_px384_prompt1.png",
    "question": "How many Knight pieces are there on this board? Answer with a number in curly brackets, e.g., {9}.",
    "truth": "5",
    "answer": "4",
    "tokens": 23,
    "quote": "If both black and white have 2 knights each, that adds up to a total of 4 knights."
   },
   {
    "image": "chess_pieces_012_remove_notitle_px768_prompt1.png",
    "question": "How many chess pieces are there on this board? Answer with a number in curly brackets, e.g., {9}.",
    "truth": "31",
    "answer": "32",
    "tokens": 0,
    "quote": null
   },
   {
    "image": "xiangqi_pieces_007_replace_notitle_px384_prompt1.png",
    "question": "How many Knight pieces are there on this board? Answer with a number in curly brackets, e.g., {9}.",
    "truth": "5",
    "answer": "4",
    "tokens": 24,
    "quote": null
   },
   {
    "image": "chess_pieces_010_remove_notitle_px768_prompt2.png",
    "question": "Count the chess pieces on this board. Answer with a number in curly brackets, e.g., {9}.",
    "truth": "31",
    "answer": "32",
    "tokens": 0,
    "quote": null
   }
  ]
 },
 {
  "key": "boards",
  "name": "Game boards",
  "icon": "fas fa-dice",
  "items": [
   {
    "image": "xiangqi_grid_08_col_add_last_col_notitle_px384_Q1.png",
    "question": "How many vertical lines are there on this board? Answer with a number in curly brackets, e.g., {9}.",
    "truth": "10",
    "answer": "9",
    "tokens": 20,
    "quote": "It looks like there are 9 vertical lines to work with."
   },
   {
    "image": "sudoku_grid_07_col_remove_first_col_notitle_px768_Q2.png",
    "question": "Count the columns on this puzzle. Answer with a number in curly brackets, e.g., {9}.",
    "truth": "8",
    "answer": "9",
    "tokens": 0,
    "quote": null
   },
   {
    "image": "xiangqi_grid_07_col_add_first_col_notitle_px768_Q1.png",
    "question": "How many vertical lines are there on this board? Answer with a number in curly brackets, e.g., {9}.",
    "truth": "10",
    "answer": "9",
    "tokens": 0,
    "quote": null
   },
   {
    "image": "sudoku_grid_08_col_remove_last_col_notitle_px384_Q1.png",
    "question": "How many columns are there on this puzzle? Answer with a number in curly brackets, e.g., {9}.",
    "truth": "8",
    "answer": "9",
    "tokens": 0,
    "quote": null
   }
  ]
 },
 {
  "key": "illusions",
  "name": "Optical illusions",
  "icon": "fas fa-eye",
  "items": [
   {
    "image": "Poggendorff_012_Q1_notitle_px384.png",
    "question": "Are the two diagonal line segments aligned? Answer in curly brackets, e.g., {Yes} or {No}.",
    "truth": "Yes",
    "answer": "No",
    "tokens": 115,
    "quote": "Ultimately, it seems like I have to conclude that there's no alignment."
   },
   {
    "image": "Poggendorff_010_Q2_notitle_px768.png",
    "question": "Do the two diagonal lines form a straight line? Answer in curly brackets, e.g., {Yes} or {No}.",
    "truth": "Yes",
    "answer": "No",
    "tokens": 245,
    "quote": null
   }
  ]
 },
 {
  "key": "grids",
  "name": "Patterned grids",
  "icon": "fas fa-th",
  "items": [
   {
    "image": "tally_006_remove_notitle_px384_prompt1.png",
    "question": "How many lines are there in cell D7? Answer with a number in curly brackets, e.g., {9}.",
    "truth": "3",
    "answer": "4",
    "tokens": 50,
    "quote": "I’m thinking there should be four lines.",
    "zoom": "tally_006_remove_notitle_px384_prompt1_zoom.jpg"
   },
   {
    "image": "dice_003_remove_notitle_px384_prompt1.png",
    "question": "How many circles are there in cell D4? Answer with a number in curly brackets, e.g., {9}.",
    "truth": "3",
    "answer": "4",
    "tokens": 16,
    "quote": "I need to focus on the D4 cell, particularly row 4 and column D, to check for the presence of four dots.",
    "zoom": "dice_003_remove_notitle_px384_prompt1_zoom.jpg"
   },
   {
    "image": "tally_014_remove_notitle_px384_prompt2.png",
    "question": "Count the lines in cell D8. Answer with a number in curly brackets, e.g., {9}.",
    "truth": "3",
    "answer": "4",
    "tokens": 66,
    "quote": "The D cell looks like it has four vertical lines, so I should count D8 within the coordinates of x142-167 and y197-220.",
    "zoom": "tally_014_remove_notitle_px384_prompt2_zoom.jpg"
   },
   {
    "image": "dice_006_remove_notitle_px384_prompt1.png",
    "question": "How many circles are there in cell D7? Answer with a number in curly brackets, e.g., {9}.",
    "truth": "3",
    "answer": "4",
    "tokens": 44,
    "quote": "It seems like D7 displays something related to four items?",
    "zoom": "dice_006_remove_notitle_px384_prompt1_zoom.jpg"
   }
  ]
 }
];
