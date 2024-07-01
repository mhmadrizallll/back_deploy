import { Knex } from "knex";
import { v4 } from "uuid";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  const getCurrentHour = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    return `${hours}:00`;
  };

  // Inserts seed entries
  await knex("cars").insert([
    {
      id: v4(),
      plate: "DBH-3491",
      manufacture: "Ford",
      model: "F150",
      image:
        "https://images.unsplash.com/photo-1571774823997-95823c1ceaf0?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rentPerDay: 200000,
      capacity: 2,
      description:
        " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
      availableAt: getCurrentHour(),
      transmission: "automatic",
      available: true,
      type: "Sedan",
      year: 2022,
      is_deleted: "false",
    },
    {
      id: v4(),
      plate: "WXB-3984",
      manufacture: "BMW",
      model: "X5",
      image:
        "https://images.unsplash.com/photo-1571774823997-95823c1ceaf0?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rentPerDay: 800000,
      capacity: 6,
      description:
        " Rear passenger map pockets. Electrochromic rearview mirror. Dual chrome exhaust tips. Locking glove box.",
      availableAt: getCurrentHour(),
      transmission: "automatic",
      available: false,
      type: "Convertible",
      year: 2019,
      is_deleted: "false",
    },
    {
      id: v4(),
      plate: "OSL-4224",
      manufacture: "Lincoln",
      model: "MKZ",
      image:
        "https://images.unsplash.com/photo-1571774823997-95823c1ceaf0?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rentPerDay: 900000,
      capacity: 6,
      description:
        " Driver & front passenger map pockets. Direct-type tire pressure monitor system. Cargo area lamp. Glove box lamp.",
      availableAt: getCurrentHour(),
      transmission: "manual",
      available: true,
      type: "Sedan",
      year: 2021,
      is_deleted: "false",
    },
    {
      id: v4(),
      plate: "VPT-9753",
      manufacture: "BMW",
      model: "M5",
      image:
        "https://images.unsplash.com/photo-1571774823997-95823c1ceaf0?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rentPerDay: 900000,
      capacity: 6,
      description: ' 6.1L SRT V8 "Hemi" engine.',
      availableAt: getCurrentHour(),
      transmission: "manual",
      available: true,
      type: "Hatchback",
      year: 2018,
      is_deleted: "false",
    },
    {
      id: v4(),
      plate: "BHD-3923",
      manufacture: "Lincoln",
      model: "Navigator",
      image:
        "https://images.unsplash.com/photo-1571774823997-95823c1ceaf0?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rentPerDay: 200000,
      capacity: 2,
      description:
        " Body color sill extension. Torsion beam rear suspension w/stabilizer bar. Front & rear passenger folding assist grips.",
      availableAt: getCurrentHour(),
      transmission: "automatic",
      available: false,
      type: "Minivan",
      year: 2020,
      is_deleted: "false",
    },
    {
      id: v4(),
      plate: "JPM-5482",
      manufacture: "Ford",
      model: "Fiesta",
      image:
        "https://images.unsplash.com/photo-1571774823997-95823c1ceaf0?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rentPerDay: 900000,
      capacity: 4,
      description:
        " Tilt steering column. Carpeted cargo area. Tip start system. Leather-wrapped shift knob.",
      availableAt: getCurrentHour(),
      transmission: "manual",
      available: true,
      type: "Hatchback",
      year: 2016,
      is_deleted: "false",
    },
    {
      id: v4(),
      plate: "BTW-1960",
      manufacture: "Honda",
      model: "Accord",
      image:
        "https://images.unsplash.com/photo-1571774823997-95823c1ceaf0?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rentPerDay: 900000,
      capacity: 4,
      description:
        " Silver finish interior door handles. 160-amp alternator. Tire pressure monitoring system (TPMS). Cloth covered headliner.",
      availableAt: getCurrentHour(),
      transmission: "automatic",
      available: false,
      type: "Sedan",
      year: 2020,
      is_deleted: "false",
    },
    {
      id: v4(),
      plate: "YHD-4104",
      manufacture: "Lincoln",
      model: "Navigator",
      image:
        "https://images.unsplash.com/photo-1571774823997-95823c1ceaf0?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rentPerDay: 300000,
      capacity: 2,
      description:
        " XM satellite radio receiver -inc: 90 day trial subscription. Dual front illuminated visor vanity mirrors.",
      availableAt: getCurrentHour(),
      transmission: "manual",
      available: true,
      type: "Regular Cab Pickup",
      year: 2014,
      is_deleted: "false",
    },
    {
      id: v4(),
      plate: "STL-7347",
      manufacture: "Buick",
      model: "LaCrosse",
      image:
        "https://images.unsplash.com/photo-1571774823997-95823c1ceaf0?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rentPerDay: 1000000,
      capacity: 6,
      description:
        " Rear reading & courtesy lamps. Zone body construction -inc: front/rear crumple zones, hood deformation point.",
      availableAt: getCurrentHour(),
      transmission: "automatic",
      available: false,
      type: "Extended Cab Pickup",
      year: 2012,
      is_deleted: "false",
    },
    {
      id: v4(),
      plate: "TJW-7622",
      manufacture: "BMW",
      model: "X5",
      image:
        "https://images.unsplash.com/photo-1571774823997-95823c1ceaf0?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rentPerDay: 300000,
      capacity: 6,
      description:
        " Cargo compartment lamp. Body color fascias w/bright insert. Front/rear stabilizer bars.",
      availableAt: getCurrentHour(),
      transmission: "manual",
      available: true,
      type: "Hatchback",
      year: 2019,
      is_deleted: "false",
    },
  ]);
}
