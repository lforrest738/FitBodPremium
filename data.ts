// Force Git Update

import { Exercise, Recipe, PartnerOffer } from './types';

export const EXERCISES: Exercise[] = [
  // --- SEATED STRENGTH (Wheelchair/Office) ---
  { id: "ssp", title: "Seated Shoulder Press", cat: "Strength", tags: ["Wheelchair User", "Upper Body", "Strength"], mins: 5, cal: 45, ins: ["Sit upright, core engaged.", "Press weights/cans overhead.", "Lower with control to ear level."] },
  { id: "sbc", title: "Seated Bicep Curls", cat: "Strength", tags: ["Wheelchair User", "Upper Body", "Arm Strength"], mins: 5, cal: 35, ins: ["Hold weights at sides.", "Curl upwards, squeezing biceps.", "Lower slowly."] },
  { id: "srb", title: "Resistance Band Rows", cat: "Strength", tags: ["Wheelchair User", "Back", "Posture"], mins: 5, cal: 50, ins: ["Loop band around a sturdy point.", "Pull elbows back.", "Squeeze shoulder blades together."] },
  { id: "wc_crunch", title: "Seated Crunches", cat: "Core", tags: ["Wheelchair User", "Core"], mins: 5, cal: 30, ins: ["Lock wheelchair brakes.", "Cross arms over chest.", "Crunch forward towards knees.", "Return upright."] },
  { id: "wc_dip", title: "Wheelchair Dips", cat: "Strength", tags: ["Wheelchair User", "Upper Body", "Strength"], mins: 3, cal: 40, ins: ["Place hands on armrests.", "Push down to lift weight off seat.", "Lower slowly."] },
  { id: "wc_twist", title: "Seated Russian Twists", cat: "Core", tags: ["Wheelchair User", "Core", "Mobility"], mins: 4, cal: 30, ins: ["Hold a weight with both hands.", "Rotate torso gently left.", "Rotate torso right.", "Keep hips stable."] },
  { id: "wc_lat_raise", title: "Lateral Raises", cat: "Strength", tags: ["Wheelchair User", "Upper Body", "Strength"], mins: 4, cal: 30, ins: ["Hold weights at sides.", "Lift arms out to the side until shoulder height.", "Lower slowly."] },
  { id: "wc_front_raise", title: "Front Raises", cat: "Strength", tags: ["Wheelchair User", "Upper Body", "Strength"], mins: 4, cal: 30, ins: ["Hold weights on lap.", "Lift arms straight front to shoulder height.", "Lower with control."] },
  { id: "wc_chest_squeeze", title: "Isometric Chest Squeeze", cat: "Strength", tags: ["Wheelchair User", "Upper Body"], mins: 3, cal: 20, ins: ["Press palms together in front of chest.", "Push as hard as possible for 10s.", "Release and repeat."] },
  { id: "wc_tricep_ext", title: "Overhead Tricep Extension", cat: "Strength", tags: ["Wheelchair User", "Upper Body", "Arm Strength"], mins: 4, cal: 35, ins: ["Hold one weight with both hands overhead.", "Bend elbows to lower weight behind head.", "Straighten arms back up."] },

  // --- REHAB & NEURO (Stroke, CP, Hemiplegia) ---
  { id: "uni_grip", title: "Unilateral Grip Squeeze", cat: "Rehab", tags: ["Hemiplegia", "Stroke Recovery", "Grip"], mins: 3, cal: 15, ins: ["Use a stress ball or towel.", "Squeeze firmly with affected hand.", "Hold for 5s, release."] },
  { id: "wt_shift", title: "Supported Weight Shifts", cat: "Balance", tags: ["Stroke Recovery", "Balance", "Lower Body"], mins: 5, cal: 25, ins: ["Stand holding a counter.", "Shift weight slowly to left leg.", "Hold 3s.", "Shift to right leg."] },
  { id: "mirror_hand", title: "Mirror Box Therapy", cat: "Rehab", tags: ["Hemiplegia", "Stroke Recovery", "Mental Health"], mins: 10, cal: 10, ins: ["Place unaffected hand in front of mirror.", "Hide affected hand behind mirror.", "Perform movements while watching reflection.", "Trick brain into visualizing movement."] },
  { id: "sit_stand", title: "Assisted Sit-to-Stand", cat: "Strength", tags: ["Lower Body", "Mobility Limited", "Stroke Recovery"], mins: 5, cal: 30, ins: ["Sit on edge of chair.", "Lean forward 'nose over toes'.", "Push through heels to stand.", "Sit back down slowly."] },
  { id: "spasticity_stretch", title: "Wrist Flexor Stretch", cat: "Mobility", tags: ["Hemiplegia", "Upper Body"], mins: 4, cal: 10, ins: ["Extend affected arm.", "Gently pull fingers back with other hand.", "Hold for 30 seconds."] },
  { id: "towel_slide", title: "Table Towel Slides", cat: "Mobility", tags: ["Hemiplegia", "Upper Body", "Stroke Recovery"], mins: 5, cal: 20, ins: ["Place hand on a towel on a table.", "Slide hand forward, then side to side.", "Use body weight to assist if needed."] },
  { id: "cup_stack", title: "Cup Stacking", cat: "Coordination", tags: ["Stroke Recovery", "Coordination", "Fun"], mins: 5, cal: 15, ins: ["Use plastic cups.", "Stack them into a pyramid.", "Unstack them using affected hand if possible."] },
  { id: "thumb_touch", title: "Finger Opposition", cat: "Coordination", tags: ["Stroke Recovery", "Grip"], mins: 3, cal: 5, ins: ["Touch thumb to index finger.", "Then thumb to middle, ring, and pinky.", "Repeat cycle."] },

  // --- BED / CHRONIC FATIGUE (Low Energy/Bedbound) ---
  { id: "bed_pump", title: "Supine Ankle Pumps", cat: "Mobility", tags: ["Bed-Bound", "Chronic Fatigue", "Recovery"], mins: 3, cal: 10, ins: ["Lie on back, legs straight.", "Point toes down.", "Pull toes up towards shins.", "Repeat rhythmically."] },
  { id: "bed_angel", title: "Bed Angels", cat: "Mobility", tags: ["Bed-Bound", "Chronic Fatigue", "Upper Body"], mins: 5, cal: 20, ins: ["Lie flat.", "Slide arms out and up like a snow angel.", "Return arms to sides."] },
  { id: "bed_glute", title: "Glute Squeezes", cat: "Strength", tags: ["Bed-Bound", "Lower Body"], mins: 3, cal: 15, ins: ["Lie on back.", "Squeeze glutes firmly.", "Hold for 5 seconds.", "Release."] },
  { id: "pillow_squeeze", title: "Adductor Pillow Squeeze", cat: "Strength", tags: ["Bed-Bound", "Lower Body", "Core"], mins: 4, cal: 20, ins: ["Lie on back, knees bent.", "Place pillow between knees.", "Squeeze pillow hard for 5s.", "Release."] },
  { id: "neck_iso", title: "Neck Isometrics", cat: "Mobility", tags: ["Bed-Bound", "Upper Body", "Pain Relief"], mins: 3, cal: 5, ins: ["Press head gently into pillow.", "Hold for 5s.", "Relax."] },
  { id: "heel_slide", title: "Heel Slides", cat: "Mobility", tags: ["Bed-Bound", "Lower Body", "Recovery"], mins: 5, cal: 25, ins: ["Lie on back.", "Slide one heel towards buttocks.", "Straighten leg back out.", "Repeat on other side."] },
  { id: "bed_march", title: "Supine Marching", cat: "Cardio", tags: ["Bed-Bound", "Cardio", "Lower Body"], mins: 5, cal: 30, ins: ["Lie on back.", "Lift one knee towards chest.", "Lower and switch legs.", "Create a rhythmic marching motion."] },
  { id: "wrist_circle", title: "Wrist Circles", cat: "Mobility", tags: ["Bed-Bound", "Upper Body", "Pain Relief"], mins: 2, cal: 5, ins: ["Extend arms.", "Rotate wrists clockwise for 30s.", "Rotate counter-clockwise."] },
  { id: "cat_cow_bed", title: "Seated Cat-Cow (Bed)", cat: "Mobility", tags: ["Bed-Bound", "Back", "Pain Relief"], mins: 4, cal: 15, ins: ["Sit on edge of bed.", "Round back, tuck chin (Cat).", "Arch back, look up (Cow).", "Flow with breath."] },

  // --- SENSORY FRIENDLY / NEURODIVERGENT (Autism, ADHD, Anxiety) ---
  { id: "wall_sit", title: "Quiet Wall Sit", cat: "Strength", tags: ["Sensory Sensitivity", "Autism/ADHD", "Legs"], mins: 2, cal: 40, ins: ["Lean back against a wall.", "Slide down until knees are bent.", "Hold the position silently.", "Breathe deeply."] },
  { id: "tai_chi", title: "Energy Push", cat: "Mindfulness", tags: ["Sensory Sensitivity", "Anxiety", "Mobility"], mins: 5, cal: 20, ins: ["Stand or sit comfortably.", "Inhale, pulling hands to chest.", "Exhale, pushing palms slowly forward."] },
  { id: "proprio_hug", title: "Self-Hug Squeeze", cat: "Mindfulness", tags: ["Sensory Sensitivity", "Anxiety", "Mental Health"], mins: 2, cal: 5, ins: ["Wrap arms tightly around chest.", "Squeeze firmly for deep pressure.", "Rock gently side to side."] },
  { id: "animal_walk", title: "Bear Crawl", cat: "Cardio", tags: ["Autism/ADHD", "Fun", "Coordination"], mins: 5, cal: 60, ins: ["Hands and feet on floor.", "Crawl forward keeping knees off ground.", "Focus on heavy work input."] },
  { id: "star_jump_quiet", title: "Low Impact Jacks", cat: "Cardio", tags: ["Sensory Sensitivity", "Cardio"], mins: 5, cal: 45, ins: ["Step foot out, raise arm.", "Step back in.", "Alternate sides rhythmically.", "No jumping/noise."] },
  { id: "heavy_carry", title: "Heavy Work Carry", cat: "Strength", tags: ["Autism/ADHD", "Sensory Sensitivity"], mins: 5, cal: 40, ins: ["Hold a heavy object (safe weight) to chest.", "Walk slowly around the room.", "Focus on the pressure and weight."] },
  { id: "rocking", title: "Rhythmic Rocking", cat: "Mindfulness", tags: ["Anxiety", "Sensory Sensitivity"], mins: 5, cal: 10, ins: ["Sit with legs crossed.", "Rock torso forward and back rhythmically.", "Sync with slow breathing."] },
  { id: "floor_push", title: "Floor Push-Ups", cat: "Strength", tags: ["Autism/ADHD", "Upper Body"], mins: 5, cal: 50, ins: ["Standard pushup or on knees.", "Focus on the pressure through palms.", "Keep core tight."] },

  // --- CARDIO & GENERAL (Inclusive) ---
  { id: "box_seat", title: "Seated Shadow Boxing", cat: "Cardio", tags: ["Wheelchair User", "Cardio", "Stress Relief"], mins: 10, cal: 90, ins: ["Punch forward (Jab/Cross).", "Maintain a rhythm.", "Keep core tight."] },
  { id: "balloon", title: "Balloon Taps", cat: "Cardio", tags: ["Coordination", "Fun", "Upper Body"], mins: 10, cal: 60, ins: ["Keep a balloon in the air.", "Use hands, head, or elbows.", "Do not let it touch the floor."] },
  { id: "arm_cycle", title: "Air Arm Cycle", cat: "Cardio", tags: ["Upper Body", "Cardio", "Wheelchair User"], mins: 5, cal: 40, ins: ["Hold arms out in front.", "Cycle hands over each other like a bike.", "Go fast for 30s, slow for 30s."] },
  { id: "march_place", title: "Seated Marching", cat: "Cardio", tags: ["Wheelchair User", "Lower Body", "Cardio"], mins: 5, cal: 35, ins: ["Lift one knee up.", "Lower it.", "Lift other knee.", "Pump arms with rhythm."] },
  { id: "rope_climb", title: "Seated Rope Climb", cat: "Cardio", tags: ["Wheelchair User", "Upper Body", "Cardio"], mins: 3, cal: 30, ins: ["Reach high with one hand.", "Pull down while reaching with other.", "Simulate climbing a rope fast."] },
  { id: "high_knees", title: "High Knees (Standing)", cat: "Cardio", tags: ["General Fitness", "Cardio", "Lower Body"], mins: 5, cal: 60, ins: ["Run in place.", "Drive knees up high towards chest.", "Pump arms."] },
  { id: "butt_kicks", title: "Butt Kicks", cat: "Cardio", tags: ["General Fitness", "Cardio", "Lower Body"], mins: 5, cal: 55, ins: ["Jog in place.", "Kick heels back towards glutes.", "Keep chest up."] },
  { id: "desk_pushup", title: "Desk Push-Ups", cat: "Strength", tags: ["General Fitness", "Upper Body", "Strength"], mins: 5, cal: 40, ins: ["Place hands on sturdy desk.", "Step feet back.", "Lower chest to desk.", "Push back up."] },
  { id: "calf_raise", title: "Standing Calf Raises", cat: "Strength", tags: ["General Fitness", "Lower Body"], mins: 3, cal: 20, ins: ["Stand tall.", "Rise up onto toes.", "Lower heels back down.", "Repeat."] },

  // --- VISUAL IMPAIRMENT (Audio Cued) ---
  { id: "balance_eyes_closed", title: "Blind Balance", cat: "Balance", tags: ["Visual Impairment", "Balance"], mins: 3, cal: 10, ins: ["Stand near a wall for safety.", "Close eyes or remove corrective lenses.", "Lift one foot slightly.", "Hold as long as possible."] },
  { id: "sound_ball", title: "Auditory Tracking", cat: "Coordination", tags: ["Visual Impairment", "Fun"], mins: 10, cal: 50, ins: ["Use a ball with a bell inside.", "Toss gently hand to hand.", "Focus on the sound source."] },
  { id: "clap_rhythm", title: "Clap Rhythm", cat: "Coordination", tags: ["Visual Impairment", "Fun"], mins: 4, cal: 15, ins: ["Clap a pattern.", "Tap knees in same pattern.", "Stomp feet in same pattern.", "Increase speed."] },
  { id: "audio_squat", title: "Audio Cued Squats", cat: "Strength", tags: ["Visual Impairment", "Lower Body"], mins: 5, cal: 45, ins: ["Stand with chair behind you.", "Lower until you feel the chair.", "Stand back up immediately.", "Don't sit fully."] },

  // --- CORE & STABILITY ---
  { id: "plank", title: "Forearm Plank", cat: "Core", tags: ["General Fitness", "Core"], mins: 2, cal: 20, ins: ["Lie on elbows and toes.", "Keep body in straight line.", "Hold."] },
  { id: "deadbug", title: "Dead Bugs", cat: "Core", tags: ["General Fitness", "Core", "Back"], mins: 4, cal: 30, ins: ["Lie on back, arms and legs in air.", "Lower opposite arm and leg.", "Return to center.", "Switch sides."] },
  { id: "bird_dog", title: "Bird Dog", cat: "Core", tags: ["General Fitness", "Balance", "Core"], mins: 5, cal: 35, ins: ["On hands and knees.", "Extend right arm and left leg.", "Hold.", "Switch sides."] }
];

export const RECIPES: Recipe[] = [
  { 
    id: "r1", 
    title: "Power Protein Oats", 
    price: 0.99, 
    img: "https://simplyfreshfoodie.com/wp-content/uploads/2022/10/peanut-butter-and-banana-protein-oats-feature-image.jpg", 
    desc: "Sustained energy release with berries.", 
    ing: ["Rolled Oats", "Protein Powder", "Chia Seeds", "Almond Milk", "Blueberries"] 
  },
  { 
    id: "r2", 
    title: "Green Recovery Smoothie", 
    price: 0.99, 
    img: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600&q=80", 
    desc: "Anti-inflammatory spinach blend.", 
    ing: ["Spinach", "Frozen Banana", "Vanilla Protein", "Coconut Water"] 
  },
  { 
    id: "r3", 
    title: "Quinoa Energy Bowl", 
    price: 1.49, 
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80", 
    desc: "Complete plant protein lunch.", 
    ing: ["Quinoa", "Chickpeas", "Avocado", "Lemon Dressing", "Cucumber"] 
  },
  { 
    id: "r4", 
    title: "Golden Lentil Stew", 
    price: 1.25, 
    img: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=600&q=80", 
    desc: "Warm & comforting turmeric boost.", 
    ing: ["Red Lentils", "Carrots", "Turmeric", "Vegetable Broth"] 
  },
  {
    id: "r5",
    title: "Berry Chia Pudding",
    price: 0.89,
    img: "https://www.eatingwell.com/thmb/4gvfgsKcjfN-ivg98H07Xt2OBsI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5872993-009f3946ef964c9c95a3dc2cb5b78db9.jpg",
    desc: "High fiber, easy digestion snack.",
    ing: ["Chia Seeds", "Almond Milk", "Raspberries", "Maple Syrup"]
  }
];

export const QUOTES = [
  "The only bad workout is the one that didn't happen.",
  "Your pace is the best pace.",
  "Movement is medicine.",
  "Small steps, every single day.",
  "Focus on what your body can do.",
  "Progress, not perfection.",
  "Listen to your body, it knows best.",
  "Rest is also part of the work."
];

export const SPONSORS: Record<string, { name: string; code: string; color: string }> = {
  "Protein Powder": { name: "ProteinPlus", code: "PRO20", color: "#E3F2FD" },
  "Rolled Oats": { name: "WholeGrainz", code: "OAT5", color: "#F1F8E9" },
  "Chia Seeds": { name: "SuperSeeds", code: "CHIA10", color: "#F3E5F5" }
};

export const PARTNERS: PartnerOffer[] = [
  {
    id: "p1",
    company: "Theragun",
    offer: "15% off Relief Devices",
    code: "FITBOD15",
    category: "Wellness",
    color: "#000000",
    logo: "T"
  },
  {
    id: "p2",
    company: "Huel",
    offer: "Free Shaker + 10% Off",
    code: "BODFUEL",
    category: "Nutrition",
    color: "#000000",
    logo: "H"
  },
  {
    id: "p3",
    company: "Calm",
    offer: "30 Days Free Premium",
    code: "MINDFIT",
    category: "Wellness",
    color: "#3b82f6",
    logo: "C"
  },
  {
    id: "p4",
    company: "Nike Adaptive",
    offer: "10% Off FlyEase Shoes",
    code: "EASE10",
    category: "Gear",
    color: "#f43f5e",
    logo: "N"
  }
];