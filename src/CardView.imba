tag CardImage
  prop language

  def abilityDesc innerHTML
    let elem = <div.abilityDesc>
    elem.dom:innerHTML = innerHTML
    return elem

  def render
    <self>
      if let largeImageUrl = data:large_image?:default
        <div.largeImage style="background-image: url({largeImageUrl});">
          for refCard in data:references
            switch refCard:ref_type
              when 'active_ability', 'passive_ability'
                <div.ability>
                <label.abilityText>
                  <div.abilityName> refCard:ref:card_name[language]
                  <div.abilityType> refCard:ref:card_type
                  abilityDesc refCard:ref:card_text[language]

        <div.illustrator> data:illustrator


export tag CardView
  prop language
  prop refImageCards

  def setupProps
    if data:is_red then dom:classList.toggle "colorRed"
    if data:is_green then dom:classList.toggle "colorGreen"
    if data:is_blue then dom:classList.toggle "colorBlue"
    if data:is_black then dom:classList.toggle "colorBlack"

    if data:rarity
      dom:classList.toggle "rarity{data:rarity}"

    if let cardType = data:card_type && data:card_type.replace(' ', '')
      dom:classList.toggle "type{cardType}"

    if data:sub_type
      dom:classList.toggle "subType{data:sub_type}"

    @refImageCards = collectRefImages data, [], []
    Imba.commit


  def collectRefImages card, acc, refedAcc
    if refedAcc.indexOf(card) < 0
      refedAcc.push card
      if card:large_image:default
        console.log card
        acc.push card

      for refCard in card:references
        if refedAcc.indexOf(refCard) < 0
          collectRefImages refCard:ref, acc, refedAcc

    return acc

  def mount
    setupProps

  def unmount
    setupProps

  def render
    <self.modal-overlay id="cv">
      <div.modal>
        <h2.cardName> data:card_name[@language]

        <div.cardImages>
          for imageCard in @refImageCards
            <CardImage[imageCard] language=language>
