import CardRow from './CardRow'
import CardView from './CardView'

tag App
  prop searchText
  prop query default: {
    text: ''
    language: 'english'
    type: {
      Hero: true
      Creep: true
      Spell: true
      Improvement: true
      Item: true
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
  prop viewingCard

  def searchText= value
    @searchText = value
    if value
      @query:text = RegExp.new(value, 'i')
    else
      @query:text = value

  def viewCard card
    viewingCard = card

  def build
    for url in ['/data/card_set_0.BB8732855C64ACE2696DCF5E25DEDD98D134DD2A.json', '/data/card_set_1.0E871AFDD63D1CBD0FB52D924DF1923C4A6D443A.json']
      let res = await window.fetch url
      let json = await res.json
      @sets.push(json:card_set)

    for set in @sets
      for card in set:card_list
        @cards.push <CardRow[card] :click.viewCard(card)>

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

      <ul.CardList> for card in @cards when card:matchs(query)
        card

      if viewingCard
        <CardView[viewingCard] :click.self.viewCard(null)>

Imba.mount <App>
