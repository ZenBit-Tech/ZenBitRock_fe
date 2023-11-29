// ----------------------------------------------------------------------

export type PropertyItem = {
    abuts_green_area: boolean | null;
    additional_features
    array[string]
    agent
    string < uuid > or null
    Example:
    102f108d - 89cc - 45cd - b294 - 96be6d18f6a1
    air_condition
boolean or null
    alarm
boolean or null
    appliances
    array[string]
    association_amenities
    array[string]
    auction_end_date
    string < date - time > or null
    Example:
    2020-01 - 13T13: 39: 22
    auction_start_date
    string < date - time > or null
    Example:
    2020-01 - 13T13: 39: 22
    bathrooms
    integer < int32 > or null
    beach_front
boolean or null
    bedrooms
    integer < int32 > or null
    building_density
    number < float > or null
    campaign_id
    string < uuid > or null
    Example:
    102f108d - 89cc - 45cd - b294 - 96be6d18f6a1
    city
string or null
        <= 255 characters
    cloned_from
    string < uuid > or null
    Example:
    102f108d - 89cc - 45cd - b294 - 96be6d18f6a1
    common_swimming_pool
boolean or null
    community_features
    array[string]
    concierge_reception
boolean or null
    conference
boolean or null
    construction_stage
string or null
        <= 35 characters
Allowed values:
    offplans
    construction_phase
    completed
    resale
    null
    Example:
    offplans
    construction_type
string or null
        <= 35 characters
Allowed values:
    concrete
    prefabricated
    metal
    null
    Example:
    concrete
    construction_year
    integer < int32 > or null
    cooling
    array[string]
    cooling_type
string or null
        <= 35 characters
Allowed values:
    autonomous_cooling_system
    central_cooling
    null
    Example:
    autonomous_cooling_system
    coordinates
    string < coordinates > or null
Enter your GPS coordinates here for latitude and longitude such as 51.5121138, -0.1283617

        <= 255 characters
    Example:
    12.1234, 12.1234
    corner_plot
boolean or null
    country
string or null
        <= 35 characters
Allowed values:
    AF
    AL
    DZ
    AS
    AD
    AO
    AI
    AQ
    AG
    AR
    AM
    AW
    AU
    AT
    AZ
    BS
    BH
    BD
    BB
    BY
    BE
    BZ
    BJ
    BM
    BT
    BO
    BQ
    BA
    BW
    BV
    BR
    IO
    BN
    BG
    BF
    BI
    CV
    KH
    CM
    CA
    KY
    CF
    TD
    CL
    CN
    CX
    CC
    CO
    KM
    CG
    CD
    CK
    CR
    HR
    CU
    CW
    CY
    CZ
    CI
    DK
    DJ
    DM
    DO
    EC
    EG
    SV
    GQ
    ER
    EE
    SZ
    ET
    FK
    FO
    FJ
    FI
    FR
    GF
    PF
    TF
    GA
    GM
    GE
    DE
    GH
    GI
    GR
    GL
    GD
    GP
    GU
    GT
    GG
    GN
    GW
    GY
    HT
    HM
    VA
    HN
    HK
    HU
    IS
    IN
    ID
    IR
    IQ
    IE
    IM
    IL
    IT
    JM
    JP
    JE
    JO
    KZ
    KE
    KI
    KP
    KR
    KW
    KG
    LA
    LV
    LB
    LS
    LR
    LY
    LI
    LT
    LU
    MO
    MG
    MW
    MY
    MV
    ML
    MT
    MH
    MQ
    MR
    MU
    YT
    MX
    FM
    MD
    MC
    MN
    ME
    MS
    MA
    MZ
    MM
    NA
    NR
    NP
    NL
    NC
    NZ
    NI
    NE
    NG
    NU
    NF
    MK
    MP
    NO
    OM
    PK
    PW
    PS
    PA
    PG
    PY
    PE
    PH
    PN
    PL
    PT
    PR
    QA
    RO
    RU
    RW
    RE
    BL
    SH
    KN
    LC
    MF
    PM
    VC
    WS
    SM
    ST
    SA
    SN
    RS
    SC
    SL
    SG
    SX
    SK
    SI
    SB
    SO
    ZA
    GS
    SS
    ES
    LK
    SD
    SR
    SJ
    SE
    CH
    SY
    TW
    TJ
    TZ
    TH
    TL
    TG
    TK
    TO
    TT
    TN
    TM
    TC
    TV
    TR
    UG
    UA
    AE
    GB
    US
    UM
    UY
    UZ
    VU
    VE
    VN
    VG
    VI
    WF
    EH
    YE
    ZM
    ZW
    AX
    null
    Example:
    AF
    cover_factor
    number < float > or null
    coverage
    integer < int32 > or null
    covered_area_amount
    number < float > or null
    covered_parking
    integer < int32 > or null
    covered_verandas_amount
    number < float > or null
    created
    string < date - time > or null
    Example:
    2020-01 - 13T13: 39: 22
    created_by
    string < uuid > or null
    Example:
    102f108d - 89cc - 45cd - b294 - 96be6d18f6a1
    customer_parking
    integer < int32 > or null
// description: string | null;
    developer_id
    string < uuid > or null
    Example:
    102f108d - 89cc - 45cd - b294 - 96be6d18f6a1
    direct_sources
string or null
        <= 35 characters
Allowed values:
    campaign
    cold_call
    website
    walk_in
    project_sign
    newsletter
    social_media
    other
    null
    Example:
    campaign
    electricity
boolean or null
    electricity_type
string or null
        <= 35 characters
Allowed values:
    single_phase
    three_phase
    industrial
    null
    Example:
    single_phase
    elevated_area
boolean or null
    elevator
boolean or null
    enclosed_office_room
boolean or null
    energy_efficiency_grade
string or null
        <= 35 characters
Allowed values:
    pending_certification
    not_required
    a
    a_plus
    b
    b_plus
    c
    d
    e
    f
    g
    h
    null
    Example:
    pending_certification
    engagement_letter_date
    string < date - time > or null
    Example:
    2020-01 - 13T13: 39: 22
    exterior_features
    array[string]
    featured
boolean or null
If you’re integrating an external system such as your website with your CRM System, use this field to mark your property as a featured property

    featured_priority
    integer < int32 > or null
    fencing
    array[string]
    fireplace
boolean or null
    fireplace_features
    array[string]
    floor_number
    integer < int32 > or null
    floor_type
string or null
        <= 35 characters
Allowed values:
    marble
    tiles
    wooden_floors
    granite
    industrial
    mosaic
    laminate
    parquet
    null
    Example:
    marble
    flooring
    array[string]
    floors_building
    integer < int32 > or null
    frontage_amount
    number < float > or null
    furnished
string or null
        <= 35 characters
Allowed values:
    furnished
    semi_furnished
    optionally_furnished
    unfurnished
    null
    Example:
    furnished
    garden_area_amount
    number < float > or null
    geocode_type
string or null
        <= 255 characters
Allowed values:
    exact
    offset
    hidden
    null
    Example:
    exact
    group_id
    string < uuid > or null
    Example:
    102f108d - 89cc - 45cd - b294 - 96be6d18f6a1
    heating
    array[string]
    heating_medium
string or null
        <= 35 characters
Allowed values:
    petrol
    gas_heating_system
    bottle_gas_lpg
    electric_heating
    underfloor_heating
    storage_heating
    heat_pump
    geothermal_energy
    fan_coil
    solar
    oil
    null
    Example:
    petrol
    heating_type
string or null
        <= 35 characters
Allowed values:
    autonomous_heating_system
    central_heating
    none
    null
    Example:
    autonomous_heating_system
    height
    number < float > or null
    home_office
boolean or null
    id
    string
        <uuid>
    Example:
    102f108d - 89cc - 45cd - b294 - 96be6d18f6a1
    ideal_for
string or null
        <= 255 characters
    inherit_project_media
    boolean
    inspection_date
    string < date - time > or null
    Example:
    2020-01 - 13T13: 39: 22
    interior_features
    array[string]
    internal_area_amount
    number < float > or null
    key_holder_details
string or null
    kitchen_type
string or null
        <= 35 characters
Allowed values:
    open_plan
    separated
    null
    Example:
    open_plan
    kitchenette
boolean or null
    kitchens
    integer < int32 > or null
    land_locked
boolean or null
    legacy_id
string or null
        <= 255 characters
    licensed_for
string or null
        <= 255 characters
    list_rental_price_amount
    number < float > or null
    list_selling_price_amount
    number < float > or null
    listing_date
    string < date > or null
    Example:
    2020-01 - 13
    living_rooms
    integer < int32 > or null
// location: string | null;
    Example:
    102f108d - 89cc - 45cd - b294 - 96be6d18f6a1
    lot_features
    array[string]
    maids_room
boolean or null
    mezzanine_amount
    number < float > or null
    minimum_tenancy
    integer < int32 > or null
    modified
    string < date - time > or null
    Example:
    2020-01 - 13T13: 39: 22
    modified_by
    string < uuid > or null
    Example:
    102f108d - 89cc - 45cd - b294 - 96be6d18f6a1
    mountain_view
boolean or null
    municipality
string or null
        <= 255 characters
    name
    string
    required
        <= 255 characters
    occupancy
string or null
        <= 16 characters
Allowed values:
    rented
    partially_rented
    unrented
    null
    Example:
    rented
    office_layout
string or null
        <= 35 characters
Allowed values:
    open_plan
    partitioned
    shell_and_core
    null
    Example:
    open_plan
    office_spaces
    integer < int32 > or null
    other_structures
    array[string]
    parking
    integer < int32 > or null
    patio_porch
    array[string]
    pets_allowed
boolean or null
    plot_area_amount
    number < float > or null
    plus_vat
    boolean
    pool_features
    array[string]
    post_code
string or null
        <= 255 characters
// price_per_square: number | null;
    price_qualifier
string or null
        <= 255 characters
Allowed values:
    fixed
    poa
    null
    Example:
    fixed
    private_swimming_pool
boolean or null
    project
    string < uuid > or null
    Example:
    102f108d - 89cc - 45cd - b294 - 96be6d18f6a1
    property_of_the_month
boolean or null
    property_subtype
string or null
        <= 255 characters
    // property_type: string;
    required
        <= 35 characters
    reception
boolean or null
    ref
    integer
        <int32>
    registered_road
boolean or null
    renovation_year
    integer < int32 > or null
    rent_frequency
string or null
        <= 255 characters
Allowed values:
    Yearly
    Quarterly
    Monthly
    Weekly
    Daily
    null
    Example:
    Yearly
    reserve_price_amount
    number < float > or null
    right_of_way
boolean or null
    roof_garden_area_amount
    number < float > or null
// sale_rent: string | null;
        <= 35 characters
Allowed values:
    for_sale
    for_rent
    for_sale_and_rent
    for_management
    for_auction
    null
    Example:
    for_sale
    salesperson
    string < uuid > or null
    Example:
    102f108d - 89cc - 45cd - b294 - 96be6d18f6a1
    sea_view
boolean or null
    secure_door
boolean or null
    security_features
    array[string]
    seller
    string < uuid > or null
    Example:
    102f108d - 89cc - 45cd - b294 - 96be6d18f6a1
    separate_laundry_room
boolean or null
    server_room
boolean or null
    short_description
string or null
If you’re integrating an external system such as your website with your CRM System, use this field for shorter descriptions of your property.This will allow you to show shorter descriptions when clicking on map pins, etc.

        smart_home
boolean or null
    solar_water_heater
boolean or null
    source
string or null
        <= 35 characters
Allowed values:
    direct
    agent
    qoetix
    null
    Example:
    direct
    source_description
string or null
    starting_bidding_amount
    number < float > or null
    state
string or null
        <= 255 characters
// status: string | null;
        <= 35 characters
Allowed values:
    pending
    available
    reserved
    sold
    rented
    withdrawn
    onboarding
    acquisition
    valuation
    instructed
    exchange
    sale_agreed
    sold_subject_to_contract
    under_offer
    null
    Example:
    pending
    storage_amount
    number < float > or null
    storage_space
boolean or null
    store_room
boolean or null
    storeys_max_floor
    integer < int32 > or null
    street
string or null
        <= 255 characters
    tenancy_type
string or null
        <= 255 characters
    total_area_amount
    number < float > or null
    town_planning_zone
string or null
        <= 35 characters
Allowed values:
    residential
    commercial
    industrial
    agricultural
    tourist
    other
    null
    Example:
    residential
    trashed
    string < date - time > or null
    Example:
    2020-01 - 13T13: 39: 22
    uncovered_area_amount
    number < float > or null
    uncovered_parking
    integer < int32 > or null
    uncovered_verandas_amount
    number < float > or null
    unit_number
string or null
        <= 255 characters
    verandas
    integer < int32 > or null
    video_link
    string < url > or null
        <= 255 characters
    Example:
    https://i-am.a.url.example/
    view
    array[string]
    virtual_tour_link
    string < url > or null
        <= 255 characters
    Example:
    https://i-am.a.url.example/
    water
boolean or null
    waterfront_features
    array[string]
    wc_bathrooms
    integer < int32 > or null
    website_listing_date
    string < date - time > or null
    Example:
    2020-01 - 13T13: 39: 22
    website_status
    string
        <= 35 characters
Allowed values:
    published
    unpublished
    Example:
    published
    website_url
string or null
        <= 2048 characters
    apartment_type
string or null
    building_type
string or null
    hotel_type
string or null
    house_type
string or null
    industrial_type
string or null
    investment_type
string or null
    land_type
string or null
    office_type
string or null
    retail_type
string or null
    price_field_amount
    number < float > or null
    custom_gb_holding_deposit
string or null
    custom_gb_chain_free
boolean or null
    custom_gb_apartment_type
string or null
Allowed values:
    Studio
    Duplex
    Townhouse
    Maisonette
    Loft
    Flat
Flat Share
Serviced Apartment
Block Of Apartments
    null
    custom_gb_cloakroom
boolean or null
    custom_gb_age_category
string or null
Allowed values:
New Build
    1980s To 1990s
    1950s To 1970s
    1940s
    1920s To 1930s
    Edwardian(1901 To 1910)
    Victorian(1837 To 1901)
    Georgian(1714 To 1830)
    Pre - 18th Century
    null
    custom_gb_holiday_home
string or null
Allowed values:
Static Caravan
Single Lodge
Twin Lodge
Park Home
    Touring
    null
    custom_gb_fenced
boolean or null
    custom_gb_conservatory
boolean or null
    custom_gb_breakfast_room
boolean or null
    custom_gb_planning_consent
boolean or null
    custom_gb_recently_renovated
boolean or null
    custom_gb_office_type
string or null
Allowed values:
    Ground
Top Floor
Whole Floor
Entire Building
Standard Office
    Office
Serviced Office
    null
    custom_gb_local_authority
string or null
    custom_gb_retail_type
string or null
Allowed values:
    Store
    Showroom
    Shop
    Restaurant
Bar Nightclub
    Café
Childcare Facility
Convenience Store
Hairdresser Barbershop
Healthcare Facility
Post Office
    Pub
Retail Property Highstreet
Retail Property Outoftown
Retail Property Park
Retail Property Popup
Retail Property Shoppingcentre
Service Station
    Spa
Sports Facilities
    Takeaway
Workshop And Retailspace
    null
    custom_gb_condition
string or null
Allowed values:
    Excellent
    Good
    Fair
Some Work Needed
Work Required Throughout
Major Renovation Required
    null
    custom_gb_industrial_type
string or null
Allowed values:
    Factory
    Warehouse
Industrial Space
Distribution Warehouse
    Garages
Heavy Industrial
Industrial Development
Industrial Park
Light Industrial
    Mill
    Storage
    null
    custom_gb_glazing
string or null
Allowed values:
    Original
Double Glazing
Triple Glazing
    null
    custom_gb_tree_survey
boolean or null
    custom_gb_street_number
string or null
    custom_gb_house_type
string or null
Allowed values:
Mansion Villa
Detached House
    Bungalow
Semi Detached House
Terraced House
    Maisonette
Semi Finished
Barn Conversion
    Cottage
Country House
Detached Bungalow
    Duplex
End of Terrace House
Farm House
House of Multiple Occupation
House Share
House Unspecified
Link Detached House
    Lodge
Log Cabin
    Longere
Manor House
Mews House
Off Plan
Retirement Property
Semi Detached Bungalow
Sheltered Housing
Small Holding
Stately Home
Stone House
Terraced Bungalow
    Townhouse
Village House
    null
    custom_gb_building_type
string or null
Allowed values:
Residential Building
Office Building
Retail Building
Mixed Use Building
Commercial Building
Residential Development
Business Park
Commercial Development
Commercial Property
    null
    custom_gb_walk_in_wardrobe
boolean or null
    custom_gb_oil_bill_included
boolean or null
    custom_gb_hotel_type
string or null
Allowed values:
    Hotel
Hotel Apartments
Campsite and Holiday Village
Guest House
    Hospitality
Hotel Room
Leisure Facility
    null
    custom_gb_road_access
boolean or null
    custom_gb_floor_number
string or null
Allowed values:
    Basement
Ground Floor
    1st Floor
    2nd Floor
Higher than 2nd Floor(No Lift)
Higher than 2nd Floor(With Lift)
    null
    custom_gb_other_type
string or null
Allowed values:
    Barn
    Castle
Equestrian Facility
Private Halls
Place of Worship
    null
    custom_gb_price_qualifier
string or null
Allowed values:
    POA
Guide Price
Fixed Price
Offers In Excess Of
Offers In Region Of
Offers Invited
Offers Over
    OIRO
Sale By Tender
    From
Part Buy Part Rent
Reduced To
Shared Equity
Shared Ownership
    null
    custom_gb_water_bill_included
boolean or null
    custom_gb_date_available_from
    string < date > or null
    Example:
    2020-01 - 13
    custom_gb_gas_bill_included
boolean or null
    custom_gb_security_deposit
string or null
    custom_gb_tenure_type
string or null
Allowed values:
    Freehold
    Leasehold
    Feudal
    Commonhold
Share of Freehold
    null
    custom_gb_all_bills_included
boolean or null
    custom_gb_land_type
string or null
Allowed values:
    Farm
Farm Land
    Land
    Agricultural
    Field
    null
    custom_gb_wet_room
boolean or null
    custom_gb_reception_rooms
string or null
    custom_gb_parking
string or null
Allowed values:
    Allocated
    Communal
    Covered
    Garage
    Driveway
    Gated
Off Street
On Street
    Rear
    Permit
    null
    custom_gb_mobile_home_type
string or null
Allowed values:
Static Caravan
Single Lodge
Twin Lodge
Park Home
    Touring
    null
    custom_gb_stamp_duty
string or null
    custom_gb_council_tax_band
string or null
Allowed values:
    A
    B
    C
    D
    E
    F
    G
    H
    I
To Be Confirmed
    null
    custom_gb_annual_service_charge
string or null
    custom_gb_ground_rent
string or null
    custom_gb_lease_expires
    string < date > or null
    Example:
    2020-01 - 13
    custom_gb_council_tax
string or null
    custom_gb_lease_start_date
    string < date > or null
    Example:
    2020-01 - 13
    custom_gb_lease_duration
string or null
    custom_gb_orientation
string or null
Allowed values:
North Facing
North East Facing
East Facing
South East Facing
South Facing
South West Facing
West Facing
North West Facing
    null
    custom_gb_bat_assessment
boolean or null
    custom_gb_road_safety_report
boolean or null
    custom_gb_outside_space
string or null
Allowed values:
Back Garden
Communal Garden
Enclosed Garden
Front Garden
Private Garden
Rear Garden
    Terrace
    Patio
    null
    custom_gb_planning_consent_number
string or null
    custom_gb_master_en_suite
boolean or null
    custom_gb_electricity_bill_included
boolean or null
    custom_gb_reserve_price
    number < float > or null
    custom_gb_satelite_tv_bill_included
boolean or null
    custom_gb_internet_bill_included
boolean or null
    custom_gb_council_tax_exempt
boolean or null
    custom_gb_separate_utility_room
boolean or null
    custom_gb_entrance_hall
boolean or null
    custom_gb_council_tax_rate_included
boolean or null
    custom_gb_accessibility
string or null
Allowed values:
Not Suitable for Wheelchair Users
Level Access
Lift Access
Ramped Access
Wet Room
Wide Doorways
    null
    custom_gb_tv_licence_included
boolean or null
    custom_gb_parking_lot_type
string or null
Allowed values:
Parking Lot
Underground Parking
    null
    custom_gb_internet_access
boolean or null
    custom_gb_planning_consent_description
string or null
    pagination
    object
    page_count
    integer
    Example:
    1
    current_page
    integer
    Example:
    1
    has_next_page
    boolean
    Example:
    true
    has_prev_page
    boolean
    Example:
    false
    count
    integer
    Example:
    2
    limit
    integer
}