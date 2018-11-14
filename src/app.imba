tag CardRow < li
  def matchField field, value, language
    switch field
      when 'is_red', 'is_green', 'is_blue', 'is_black'
        return data[field]
      when 'rarity'
        return data:rarity == value
      else
        if let field_value = data[field]
          if let field_language_value = data[field][language]
            return field_language_value.toLowerCase.search(value) >= 0
          else
            if typeof(field_value) == 'string'
              return field_value.toLowerCase.search(value) >= 0


  def matchs query, language
    for field, value of query
      if value && !matchField(field, value, language)
        return false

    return true

  def setup
    if data:is_red then dom:classList.add "colorRed"
    if data:is_green then dom:classList.add "colorGreen"
    if data:is_blue then dom:classList.add "colorBlue"
    if data:is_black then dom:classList.add "colorBlack"

    if data:rarity
      dom:classList.add "rarity{data:rarity}"

    if let cardType = data:card_type && data:card_type.replace(' ', '')
      dom:classList.add "type{cardType}"

    if data:sub_type
      dom:classList.add "subType{data:sub_type}"

  def render
    <self>
      if let cardIconUrl = data:mini_image && data:mini_image:default
        <div.cardIcon style="background-image: url({cardIconUrl});">
      else
        <div.cardIcon>

      <div.cardType>
      <div.cardCost> data:mana_cost or data:gold_cost
      <div.cardName> data:card_name:english

tag CardView
  def render
    <self.modal-overlay>
      <div.modal> data:card_name:english


tag App
  prop language default: 'english'
  prop query default: {
    card_name: ''
    card_type: ''
    card_text: ''
    is_red: false
    is_green: false
    is_blue: false
    is_black: false
    rarity: null
  }
  prop sets default: []
  prop cards default: []
  prop viewingCard

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
        <input[query:card_name] placeholder='Card name...'>
        <input[query:card_text] placeholder='Card text...'>
        # <input[query:card_type] placeholder='Card type...'>

        <fieldset>
          <legend> 'Colors'
          for color in ['red', 'green', 'blue', 'black']
            <div.checkbox.color.{'is_'+color}>
              <input[query["is_{color}"]] type='checkbox'>
              <label>

        <fieldset>
          <legend> 'Rarity'
          for rarity in ['Basic', 'Common', 'Uncommon', 'Rare']
            <div.checkbox.rarity.{rarity}>
              if rarity == query:rarity
                <input[query:rarity] type='checkbox'>
              else
                <input[query:rarity] type='checkbox' value=rarity>
              <label>
              console.log query:rarity

      <ul.CardList> for card in @cards when card:matchs(query, @language)
        card

      if viewingCard
        <CardView[viewingCard] :click.self.viewCard(null)>

Imba.mount <App>
