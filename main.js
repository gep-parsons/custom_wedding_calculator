/* eslint-disable camelcase */
// aux. functions for santizing input values
function setInputFilter(textbox, inputFilter) {
  [
    'input',
    'keydown',
    'keyup',
    'mousedown',
    'mouseup',
    'select',
    'contextmenu',
    'drop',
  ].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty('oldValue')) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = '';
      }
    });
  });
}

const wrapRadioElementsInDiv = (
  elements,
  wrapper = document.createElement('div')
) => {
  // give wrapper a 'radio_element_div' class
  wrapper.classList.add('radio_element_div');
  elements.forEach(el => wrapper.appendChild(el));
  return wrapper;
};

function filterInt(value) {
  if (/^[-+]?(\d+|Infinity)$/.test(value)) {
    return Number(value);
  }
  return 0;
}

const make_section = (
  copy_list,
  value_list,
  section_name,
  section_heading,
  section_description = null
) => {
  if (copy_list.length !== value_list.length) {
    throw 'copy_list and value_list must be the same length!';
  }

  const section_wrapper = document.createElement('div');
  section_wrapper.id = `${section_name}_wrapper`;
  const section_header = document.createElement('h4');
  section_header.textContent = section_heading;

  section_wrapper.appendChild(section_header);

  if (section_description !== null) {
    const section_descript = document.createElement('p');
    section_descript.textContent = section_description;
    section_wrapper.appendChild(section_descript);
  }

  for (let index = 0; index < copy_list.length; index++) {
    const input_val = document.createElement('input');
    input_val.type = 'radio';
    input_val.name = section_name;
    input_val.id = `xx_${section_name}_input_${index}`;
    input_val.value = `${value_list[index]}`;
    if (index === 0) {
      input_val.checked = 'checked';
    }
    input_val.classList.add('recalc');

    const label_val = document.createElement('label');
    label_val.htmlFor = input_val.id;
    label_val.id = `xx_${section_name}_label_${index}`;
    label_val.textContent = `${copy_list[index]}`;

    const result = wrapRadioElementsInDiv([input_val, label_val]);
    section_wrapper.appendChild(result);
  }

  return section_wrapper;
};

function add_first_section() {
  // days (radio buttons)

  const day_wrapper = make_section(
    [
      'Prime Saturday + Friday $5800 (May/ June / August /September/ October)',
      'Saturday + Friday $5300 (April / July)',
      'Prime Saturday $4900 (May/ June / August /September/ October)',
      'Friday + Thursday $4900 (May / June / August /September/ October)',
      'Prime Friday $4500 (May / June / August /September/ October)',
      'Saturday $4400 (April / July)',
      'Friday + Thursday $4400 (April /July)',
      'Friday $4000 (April/July)',
      'Sunday $3900',
    ],
    [5800, 5300, 4900, 4900, 4500, 4400, 4400, 4000, 3900],
    'dow',
    'Day of the week',
    'JR’s Barn rental fee is related to day of the week'
  );

  // add to overall_wrapper
  const overall_wrapper = document.querySelector('#calculator');
  overall_wrapper.appendChild(day_wrapper);
}

function add_first_section_aux() {
  setInputFilter(document.getElementById('main_guest_input'), function(value) {
    return /^\d*$/.test(value);
  });
}

function add_second_section() {
  // cocktails
  const alcohol_wrapper = make_section(
    [
      'No Alcohol – Free ',
      'We will be offering cash bar set up - $250',
      'We are likely to choose beer, wine, and a few signature drinks for a group of around 150 - $1600',
      'We like to have a good time & have a bigger group, or are likely to choose some higher end options - $2000',
      'Yeah.... we have a big group and should probably budget on the high end. $2,800+',
    ],
    [0, 250, 1600, 2000, 2800],
    'alcohol',
    'Cocktails, beer, and wine'
  );

  // insert after day wrapper
  const day_wrapper = document.querySelector('#dow_wrapper');
  day_wrapper.insertAdjacentElement('afterend', alcohol_wrapper);

  // next section is eats, name is eats
  const eat_wrapper = make_section(
    [
      'I want a very affordable option that tastes good. ($13 pp approx)',
      'I want great food, but not too many options to keep my budget in check. ($20 pp approx)',
      'I want great food and for my guests to really enjoy their meal ($30 pp approx)',
      `I'm a foodie - I want yummy and custom ($40+ pp approx)`,
    ],
    [13, 20, 30, 40],
    'eats',
    'Good eats',
    'Please note our estimates here include a rough estimate for taxes, service fees, delivery, etc.'
  );

  alcohol_wrapper.insertAdjacentElement('afterend', eat_wrapper);

  // pictures
  const picture_wrapper = make_section(
    [
      `We will have an entry level photographer. $650`,
      `I will be looking for the least expensive option. I'm willing to hire an amateur. Other things are more important to me. $1,300`,
      `I know photos are important and want a semi-pro wedding photographer, even if it's for less than a full day of coverage. $2,100`,
      `I want really good photos and lots of them. $3,000`,
      'Photography is one of the most important elements of my wedding to me. I want to invest and get a pro. $4,000+',
    ],
    [650, 1300, 2100, 3000, 4000],
    'pictures',
    'Capturing the moment'
  );

  eat_wrapper.insertAdjacentElement('afterend', picture_wrapper);
}

function add_third_section() {
  const flower_wrapper = make_section(
    [
      `I would prefer not to spend any of my budget on flowers and use faux options available in JR's Barn's decor. $0`,
      `I want flowers for the bridal party and parents only. $1,000`,
      `I want some flowers for the ceremony area and/or reception area. $2,000`,
      `I love flowers! Bring them on. $3,000`,
      `Flowers are very important to me and I plan to invest in them heavily. $4,000+`,
    ],
    [0, 1000, 2000, 3000, 4000],
    'flowers',
    'All the pretty flowers'
  );

  const photo_wrapper = document.querySelector('#pictures_wrapper');
  photo_wrapper.insertAdjacentElement('afterend', flower_wrapper);

  // Other pretty stuff
  const other_pretty_wrapper = make_section(
    [
      `I plan to use JR’s Barn included decor and only but simple things I need customized like a guestbook, table assignments, etc. $200`,
      `I have lots of ideas for customization of the space using items I bring in, but I'll also try to keep an eye on my spending. $500`,
      `I want to work with a professional designer to bring in a custom look/feel for the space with unique rentals - $2000+`,
    ],
    [200, 500, 2000],
    'other_decor',
    'The other pretty things'
  );

  flower_wrapper.insertAdjacentElement('afterend', other_pretty_wrapper);

  // DJ
  const dj_wrapper = make_section(
    [
      `I want a competent professional. $650`,
      `I want a professional with more lighting and upgrades. $1,000`,
      `We will likely go with dueling pianos, or something more upscale. $2,000+`,
    ],
    [650, 1000, 2000],
    'dj',
    `Let's get the party started with a DJ`
  );

  other_pretty_wrapper.insertAdjacentElement('afterend', dj_wrapper);

  // video
  const video_wrapper = make_section(
    [
      `I don't think I want video - $0`,
      `Yes – I would like good quality raw footage of our wedding day.$650`,
      `Yes - I would love good quality/affordable video to remember our big day. $1,800`,
      `I want high end videography of our wedding day. $3000+`,
    ],
    [0, 650, 1800, 3000],
    'video',
    'Capturing your memories in video'
  );
  dj_wrapper.insertAdjacentElement('afterend', video_wrapper);

  // dress
  const dress_wrapper = make_section(
    [
      `I know I'll look beautiful without the dress being expensive. $500`,
      'The dress is important to me. $1,200',
      `I know I'm going to fall in love something more expensive. $2,000`,
      `My dress is extremely important to me. $3,000+`,
    ],
    [500, 1200, 2000, 3000],
    'dress',
    `"The Dress"`
  );

  video_wrapper.insertAdjacentElement('afterend', dress_wrapper);

  // spouse
  const spouse_wrapper = make_section(
    [
      `They'll look great in anything. $250`,
      `They're a little picky. $500`,
      `It's really important too. $1000+`,
    ],
    [250, 500, 1000],
    'spouse',
    `Your other halves attire`
  );

  dress_wrapper.insertAdjacentElement('afterend', spouse_wrapper);
}

function add_final_section() {
  const spouse_wrapper = document.querySelector('#spouse_wrapper');

  const makeup_wrapper = make_section(
    [
      `I plan to do my own hair and makeup - $0`,
      `I want to have my hair and makeup done professionally, but not pay for others $350`,
      `I want to pay for a small bridal party to have their hair and makeup done professionally $800`,
      `I want to pay for a small bridal party + a few other special women (moms, grandmas, etc.) to have hair and makeup done. $1,200`,
    ],
    [0, 350, 800, 1200],
    'makeup',
    `Beautiful you`
  );

  spouse_wrapper.insertAdjacentElement('afterend', makeup_wrapper);

  // cake
  const cake_wrapper = make_section(
    [
      `We will work hard to choose an affordable option. $200`,
      `We want a traditional, but not over the top cake. $500 (This estimate is not based on headcount.)`,
      `We want something fun like an ice cream bar, cheesecake bar, etc. $1,200+`,
    ],
    [200, 500, 1200],
    'cake',
    `Let's talk cake`
  );

  makeup_wrapper.insertAdjacentElement('afterend', cake_wrapper);

  // linens
  const linen_wrapper = make_section(
    [
      `I plan to borrow table linens from a friend who just got married. $0`,
      `I want to rent basic linens (150 guests) from JR’s Barn (Anna Groskreutz). $400`,
      `I want to do the work - I will rent  linens & linen napkins from JR’s Barn (Anna Groskreutz). $675`,
      `I love luxury linens. $1,000`,
    ],
    [0, 400, 675, 1000],
    'linens',
    `Lovely linens`
  );

  cake_wrapper.insertAdjacentElement('afterend', linen_wrapper);

  // invites
  const invite_wrapper = make_section(
    [
      `It's modern day. I'm sending electronic invites or just doing a wedding website. $0`,
      `I will choose simple and affordable invites. $350`,
      `I'm totally in love with all the beautiful invitations on Pinterest and will invest in this area. $800+`,
    ],
    [0, 500, 800],
    'invites',
    `Tell us about your pretty paper ideas`
  );

  linen_wrapper.insertAdjacentElement('afterend', invite_wrapper);

  // transporation
  const transportation_wrapper = make_section(
    [
      `I plan not to provide transportation for my guests since there is a hotel so nearby - $0`,
      `I want a basic transportation option for guests - $600`,
      `I want a basic transportation option for all guests - $1,200`,
    ],
    [0, 600, 1200],
    'transportation',
    `Getting from here to there`
  );

  invite_wrapper.insertAdjacentElement('afterend', transportation_wrapper);

  // plates
  const plates_wrapper = make_section(
    [
      `I want to use the disposable with the caterers pricing - $0`,
      `I want a pretty disposable option that looks good in photos - $300`,
      `I want real china - $1,000+`,
    ],
    [0, 300, 1000],
    'plates',
    `Plates and such`
  );

  transportation_wrapper.insertAdjacentElement('afterend', plates_wrapper);
  // extras
  const extras_wrapper = make_section(
    ['$200', '$500', '$1,000', '$2,000', '$3,000', '$5,000'],
    [200, 500, 1000, 2000, 3000, 5000],
    'extras',
    `How much do you want to allow for the "extras" fun things you might come up with? (Favors, late night snacks, gifts for bridal party, etc.), upgrades to the above options, or things not accounted for?`
  );

  plates_wrapper.insertAdjacentElement('afterend', extras_wrapper);
}

function calculate_total_value() {
  function convert_null_to_zero(a) {
    const result = a || 0;
    return result;
  }

  // get radio group's value.
  const first_radio_val = convert_null_to_zero(
    document.querySelector('input[name="dow"]:checked').value
  );
  const second_radio_val = convert_null_to_zero(
    document.querySelector('input[name="alcohol"]:checked').value
  );
  const third_radio_val = convert_null_to_zero(
    document.querySelector('input[name="eats"]:checked').value
  );
  const fourth_radio_val = convert_null_to_zero(
    document.querySelector('input[name="pictures"]:checked').value
  );
  const fifth_radio_val = convert_null_to_zero(
    document.querySelector('input[name="flowers"]:checked').value
  );
  const sixth_radio_val = convert_null_to_zero(
    document.querySelector('input[name="other_decor"]:checked').value
  );
  const dj_radio_val = convert_null_to_zero(
    document.querySelector('input[name="dj"]:checked').value
  );
  const video_radio_val = convert_null_to_zero(
    document.querySelector('input[name="video"]:checked').value
  );
  const dress_radio_val = convert_null_to_zero(
    document.querySelector('input[name="dress"]:checked').value
  );
  const spouse_radio_val = convert_null_to_zero(
    document.querySelector('input[name="spouse"]:checked').value
  );
  const makeup_radio_val = convert_null_to_zero(
    document.querySelector('input[name="makeup"]:checked').value
  );
  let cake_radio_val;
  if (document.querySelector('input[name="cake"]:checked') != null) {
    cake_radio_val = document.querySelector('input[name="cake"]:checked').value;
  } else {
    cake_radio_val = 0;
  }
  let linens_radio_val;
  if (document.querySelector('input[name="linens"]:checked') != null) {
    linens_radio_val = document.querySelector('input[name="linens"]:checked')
      .value;
  } else {
    linens_radio_val = 0;
  }
  let paper_radio_val;
  if (document.querySelector('input[name="paper"]:checked') != null) {
    paper_radio_val = document.querySelector('input[name="paper"]:checked')
      .value;
  } else {
    paper_radio_val = 0;
  }
  let pretty_paper_val;
  if (document.querySelector('input[name="invites"]:checked') != null) {
    pretty_paper_val = document.querySelector('input[name="invites"]:checked')
      .value;
  } else {
    pretty_paper_val = 0;
  }
  let transportation_radio_val;
  if (document.querySelector('input[name="transportation"]:checked') != null) {
    transportation_radio_val = document.querySelector(
      'input[name="transportation"]:checked'
    ).value;
  } else {
    transportation_radio_val = 0;
  }
  let plates_radio_val;
  if (document.querySelector('input[name="plates"]:checked') != null) {
    plates_radio_val = document.querySelector('input[name="plates"]:checked')
      .value;
  } else {
    plates_radio_val = 0;
  }
  let extras_radio_val;
  if (document.querySelector('input[name="extras"]:checked') != null) {
    extras_radio_val = document.querySelector('input[name="extras"]:checked')
      .value;
  } else {
    extras_radio_val = 0;
  }
  let number_of_people;
  if (document.querySelector('#main_guest_input') != null) {
    number_of_people = document.querySelector('#main_guest_input').value;
  } else {
    number_of_people = 150;
  }

  let sum =
    filterInt(first_radio_val) +
    filterInt(second_radio_val) +
    filterInt(third_radio_val) * filterInt(number_of_people) + // food
    filterInt(fourth_radio_val);
  sum += filterInt(fifth_radio_val);
  sum += filterInt(sixth_radio_val);
  sum += filterInt(dj_radio_val);
  sum += filterInt(video_radio_val);
  sum += filterInt(dress_radio_val);
  sum += filterInt(spouse_radio_val);
  sum += filterInt(makeup_radio_val);
  sum += filterInt(cake_radio_val);
  sum += filterInt(linens_radio_val);
  sum += filterInt(paper_radio_val);
  sum += filterInt(pretty_paper_val);
  sum += filterInt(transportation_radio_val);
  sum += filterInt(plates_radio_val);
  sum += filterInt(extras_radio_val);

  return sum;
}

function overarching_load() {
  const ov_wrapper = document.createElement('div');
  ov_wrapper.id = 'ov_wrapper';
  const show_calc_div_wrapper = document.createElement('div');
  show_calc_div_wrapper.id = 'alt_calculator_div';
  const calc_div_text = document.createElement('h4');
  calc_div_text.textContent = 'General Estimated Investment';
  const calc_div_number = document.createElement('p');
  calc_div_number.id = 'div_span_total';
  const divider = document.createElement('span');
  divider.id = 'bottom_divider';

  // include number of guests inside of own div
  const guests_wrapper = document.createElement('div');
  guests_wrapper.id = 'guests_wrapper';
  const num_guests_header = document.createElement('h4');
  num_guests_header.textContent = 'How many guests? (add 10 for vendors)';

  const main_guest_input = document.createElement('input');
  main_guest_input.id = 'main_guest_input';
  main_guest_input.type = 'text';
  main_guest_input.value = '150';
  main_guest_input.classList.add('recalc');

  show_calc_div_wrapper.appendChild(calc_div_text);
  show_calc_div_wrapper.appendChild(calc_div_number);
  guests_wrapper.appendChild(num_guests_header);
  guests_wrapper.appendChild(main_guest_input);
  ov_wrapper.appendChild(guests_wrapper);
  ov_wrapper.appendChild(divider);
  ov_wrapper.appendChild(show_calc_div_wrapper);

  const overall_wrapper = document.querySelector('#calculator');
  overall_wrapper.appendChild(ov_wrapper);

  add_first_section();
  add_first_section_aux();
  add_second_section();
  add_third_section();
  add_final_section();

  // calculate total value
  const total_sum = calculate_total_value();
  const sum_span = document.querySelector('#div_span_total');
  sum_span.textContent = `$${total_sum}`;

  // event to recalculate total value
  const recalc_elements = document.querySelectorAll('.recalc');

const guests = document.querySelector('#guests_wrapper');
  const footer = document.querySelector('#alt_calculator_div');
  const alt_divider = document.querySelector('#bottom_divider');
  const al_wrapper = document.querySelector('#alcohol_wrapper');
  const last_el = document.querySelector('#extras_wrapper');
  function top_offset(el) {
    const rect = el.getBoundingClientRect();
    return rect.top;
  }
  function bottom_offset(el) {
    const rect = el.getBoundingClientRect();
    return rect.bottom;
  }
  function checkPosition() {
    const windowY = window.scrollY;
    const topval = top_offset(al_wrapper) + 50; // buffer
    const bottom_height = bottom_offset(last_el) - 150;
    if (windowY > topval) {
      guests.style.display = 'none';
      alt_divider.style.display = 'none';
    } else {
      guests.style.display = 'block';
      alt_divider.style.display = 'block';
    }
    if (0 > bottom_height) {
      footer.style.display = 'none';
    } else {
      footer.style.display = 'block';
    }
  }

  window.addEventListener('scroll', checkPosition);

  recalc_elements.forEach(el =>
    el.addEventListener('change', () => {
      const update_sum_span = document.querySelector('#div_span_total');
      const update_total_sum = calculate_total_value();
      update_sum_span.textContent = `$${update_total_sum}`;
    })
  );
}

// implement additions
if (window.attachEvent) {
  window.attachEvent('onload', overarching_load);
} else {
  window.addEventListener('load', overarching_load, false);
}
