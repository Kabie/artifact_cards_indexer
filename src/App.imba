import CardRow from './CardRow'
import CardView from './CardView'

let languages = {
  english: "English"
  german: "Deutsch"
  french: "Français"
  italian: "Italiano"
  koreana: "한국어"
  spanish: "Español"
  schinese: "简体中文"
  tchinese: "繁體中文"
  russian: "Русский"
  thai: "thai"
  japanese: "日本語"
  portuguese: "portuguese"
  polish: "polish"
  danish: "danish"
  dutch: "dutch"
  finnish: "finnish"
  norwegian: "norwegian"
  swedish: "swedish"
  hungarian: "hungarian"
  czech: "czech"
  romanian: "romanian"
  turkish: "turkish"
  brazilian: "Português-Brasil"
  bulgarian: "bulgarian"
  greek: "greek"
  ukrainian: "ukrainian"
  latam: "Español - Latinoamérica"
  vietnamese: "vietnamese"
}

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
    otherTypes: false
    sub_type: {
      Armor: true
      Weapon: true
      Accessory: true
      Consumable: true
      Deed: true
    }
    color: {
      is_red: true
      is_green: true
      is_blue: true
      is_black: true
    }
    noColor: true
    rarity: {
      Common: true
      Uncommon: true
      Rare: true
    }
    noRarity: true
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
    if card:card_name[language]?.search(text) >= 0 or card:card_name:english?.search(text) >= 0
      return true

    if card:card_text[language]?.search(text) >= 0 or card:card_text:english?.search(text) >= 0
      return true

    for refCard in card:references
      if ['includes', 'active_ability', 'passive_ability'].indexOf(refCard:ref_type) >= 0 and matchText(refCard:ref, text)
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

  def matchType card, types, otherTypes
    if card:card_type
      switch types[card:card_type]
        when true
          return true
        when undefined
          return otherTypes


  def matchSubType card, sub_types
    if card:sub_type
      for sub_type, is_sub_type of sub_types
        if is_sub_type && card:sub_type == sub_type
          return true

    return false

  def matchRarity card, rarities, noRarity
    if card:rarity
      switch rarities[card:rarity]
        when true
          return true
        when undefined
          return noRarity
    else
      return noRarity

  def matchs card, query
    if !matchColor(card, query:color, query:noColor)
      return false

    if !matchType(card, query:type, query:otherTypes)
      return false

    if card:sub_type && !matchSubType(card, query:sub_type)
      return false

    if !matchRarity(card, query:rarity, query:noRarity)
      return false

    if query:text && !matchText(card, query:text)
      return false

    return true

  def toggleItemDeed
    query:sub_type:Deed = query:sub_type:Consumable

  def build
    for url in ['./data/card_set_0.5DFBBB9F063A1D842DAD7190C2ACDC0E56DF8895.json',
                './data/card_set_1.CFC30664A2624B97F94582203175DC49D76EA716.json']
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
          <div.checkbox.type.Others>
            <input[query:otherTypes] type='checkbox' title='Others'>
            <label>
          for type in ['Hero', 'Creep', 'Spell', 'Improvement', 'Item']
            <div.checkbox.type.{type}>
              <input[query:type[type]] type='checkbox' title=type>
              <label>

        <fieldset>
          # <legend> 'SubType'
          for sub_type in ['Armor', 'Weapon', 'Accessory', 'Consumable']
            <div.checkbox.type.{sub_type}>
              <input[query:sub_type[sub_type]] type='checkbox' title=sub_type .change.toggleItemDeed>
              <label>

        <fieldset>
          # <legend> 'Color'
          for color in ['red', 'green', 'blue', 'black']
            <div.checkbox.color.{'is_'+color}>
              <input[query:color["is_{color}"]] type='checkbox' title=color>
              <label>
          <div.checkbox.color.none>
            <input[query:noColor] type='checkbox' title='No color'>
            <label>

        <fieldset>
          # <legend> 'Rarity'
          <div.checkbox.rarity.Basic>
            <input[query:noRarity] type='checkbox' title='Basic'>
            <label>

          for rarity in ['Common', 'Uncommon', 'Rare']
            <div.checkbox.rarity.{rarity}>
              <input[query:rarity[rarity]] type='checkbox' title=rarity>
              <label>

        <select[language].language :change.changeLanguage>
          for lang in Object.keys(languages)
            <option value=lang> languages[lang]

      <ul.CardList>
        for card in @cards when matchs(card, query)
          <CardRow[card] language=@language :tap.viewCard(card)>

      if viewingCard
        <CardView[viewingCard] language=@language :tap.self.viewCard(null)>

Imba.mount <App>
