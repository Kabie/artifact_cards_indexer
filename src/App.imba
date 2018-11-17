import CardRow from './CardRow'
import CardView from './CardView'

let languages = [
  "english"
  "german"
  "french"
  "italian"
  "koreana"
  "spanish"
  "schinese"
  "tchinese"
  "russian"
  "thai"
  "japanese"
  "portuguese"
  "polish"
  "danish"
  "dutch"
  "finnish"
  "norwegian"
  "swedish"
  "hungarian"
  "czech"
  "romanian"
  "turkish"
  "brazilian"
  "bulgarian"
  "greek"
  "ukrainian"
  "latam"
  "vietnamese"
]

tag App
  prop searchText
  prop language default: 'english'
  prop query default: {
    text: ''
    type: {
      Hero: true
      Creep: true
      Spell: true
      Improvement: true
      Item: true
    }
    sub_type: {
      Armor: true
      Weapon: true
      Accessory: true
      Consumable: true
    }
    color: {
      is_red: true
      is_green: true
      is_blue: true
      is_black: true
    }
    no_color: true
    rarity: {
      Basic: true
      Common: true
      Uncommon: true
      Rare: true
    }
  }
  prop sets default: []
  prop cards default: []
  prop cardsIndex default: {}
  prop viewingCard

  def searchText= value
    @searchText = value
    if value
      @query:text = RegExp.new(value, 'i')
    else
      @query:text = value

  def viewCard card
    viewingCard = card

  def changeLanguage e
    let newLanguage = e.target.value
    for card in @cards
      card:language


  def matchText card, text
    if card:card_name[language]?.search(text) >= 0
      return true

    if card:card_text[language]?.search(text) >= 0
      return true

    if card:illustrator?.search(text) >= 0
      return true

    if card:attack?.toString.search(text) >= 0
      return true

    if card:armor?.toString.search(text) >= 0
      return true

    if card:hit_points?.toString.search(text) >= 0
      return true

    if card:mana_cost?.toString.search(text) >= 0
      return true

    if card:gold_cost?.toString.search(text) >= 0
      return true

  def matchColor card, colors, noColor
    var hasColor = false
    for color, is_color of colors
      if card[color]
        hasColor = true
        if is_color && card[color] === is_color
          return true
    return if hasColor
      false
    else
      noColor !== hasColor

  def matchType card, types
    for type, is_type of types
      if card:card_type
        if is_type && card:card_type == type
          return true

    return false

  def matchSubType card, sub_types
    for sub_type, is_sub_type of sub_types
      if card:sub_type
        if is_sub_type && card:sub_type == sub_type
          return true

    return false

  def matchRarity card, rarities
    for rarity, is_rarity of rarities
      if card:rarity
        if is_rarity && card:rarity == rarity
          return true
      else
        if rarity == 'Basic' && is_rarity
          return true

    return false

  def matchs card, query
    if !matchColor(card, query:color, query:no_color)
      return false

    if !matchType(card, query:type)
      return false

    if card:sub_type && !matchSubType(card, query:sub_type)
      return false

    if !matchRarity(card, query:rarity)
      return false

    if query:text && !matchText(card, query:text)
      return false

    return true


  def build
    for url in ['/data/card_set_0.C0748A17E2C08252A9CCE75BB593E62D71DCDA77.json',
                '/data/card_set_1.130CC34F7AC434B206D832879328A0D91D312873.json']
      let res = await window.fetch url
      let json = await res.json
      @sets.push(json:card_set)

    for set in @sets
      for card in set:card_list
        @cards.push card
        @cardsIndex[card:card_id] = card

    for _, card of cardsIndex
      for refCard in card:references
        refCard:ref = @cardsIndex[refCard:card_id]

    Imba.commit


  def render
    <self.vbox>
      <header.query>
        <input[searchText] placeholder='Search...'>

        <fieldset>
          # <legend> 'Type'
          for type in ['Hero', 'Creep', 'Spell', 'Improvement', 'Item']
            <div.checkbox.type.{type}>
              <input[query:type[type]] type='checkbox'>
              <label>

        <fieldset>
          # <legend> 'SubType'
          for sub_type in ['Armor', 'Weapon', 'Accessory', 'Consumable']
            <div.checkbox.type.{sub_type}>
              <input[query:sub_type[sub_type]] type='checkbox'>
              <label>

        <fieldset>
          # <legend> 'Color'
          for color in ['red', 'green', 'blue', 'black']
            <div.checkbox.color.{'is_'+color}>
              <input[query:color["is_{color}"]] type='checkbox'>
              <label>
          <div.checkbox.color.none>
            <input[query:no_color] type='checkbox'>
            <label>

        <fieldset>
          # <legend> 'Rarity'
          for rarity in ['Basic', 'Common', 'Uncommon', 'Rare']
            <div.checkbox.rarity.{rarity}>
              <input[query:rarity[rarity]] type='checkbox'>
              <label>

        <select[language].language :change.changeLanguage> for lang in languages
          <option value=lang> lang

      <ul.CardList>
        for card in @cards when matchs(card, query)
          <CardRow[card] language=@language :click.viewCard(card)>

      if viewingCard
        <CardView[viewingCard] language=@language :click.self.viewCard(null)>

Imba.mount <App>
