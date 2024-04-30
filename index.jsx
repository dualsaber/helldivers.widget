import { css } from "uebersicht"

import { getPlanetEvents, getAssignments, getAllPlanets } from "./lib/api"

// CONFIGS
const REFRESH_INTERVAL = 20
const VERSION = "v1.2.0"

export const initialState = {
  loading: 1,
  events: [],
  order: {}
}

export const command = async dispatch => {
  const planets = await getAllPlanets()
  dispatch({
    type: "SET_ORDER",
    data: await getAssignments(planets)
  })
  dispatch({ type: "SET_EVENTS", data: await getPlanetEvents() })
  dispatch({ type: "SET_LOADING", data: 0 })
}

export const updateState = (event, previousState) => {
  if (event.type === "SET_LOADING") {
    return { ...previousState, loading: event.data }
  } else if (event.type === "SET_EVENTS") {
    return { ...previousState, events: event.data }
  } else if (event.type === "SET_ORDER") {
    return { ...previousState, order: event.data }
  } else {
    return previousState
  }
}

export const refreshFrequency = 1000 * REFRESH_INTERVAL // 2.5 seconds

export const className = {
  bottom: 170,
  left: 15,
  borderRadius: 20,
  padding: "10px 15px",
  color: "#fff",
  width: 130,
  height: 130,
  backgroundColor: "rgba(0,0,0,0.10)",
  backdropFilter: "blur(50px)",
  fontFamily: "Chakra Petch, -apple-system, BlinkMacSystemFont, sans-serif"
}

const title_main = css`
  color: #fee801;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`
const title_main_normal = css`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`
const title_top = css``
const title_bottom = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
`
const planet_name = css`
  margin-bottom: 5px;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  align-items: center;
`
const planet_name_left = css`
  display: flex;
  align-items: center;
  & img {
    margin-right: 5px;
  }
`
const planet_name_right = css``
const planet_main = css`
  margin-bottom: 15px;
`
const planet_percentage = css`
  background: darkred;
  position: relative;
  height: 14px;
`
const planet_percentage_green = css`
  height: 14px;
  background: green;
`
const planet_percentage_number = css`
  position: absolute;
  font-size: 11px;
  left: 2px;
`

const wrapper = css`
  @font-face {
    font-family: "Chakra Petch";
    src: url("/helldivers.widget/src/fonts/ChakraPetch-Regular.woff2")
        format("woff2"),
      url("/helldivers.widget/src/fonts/ChakraPetch-Regular.woff")
        format("woff");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`

const loader = css`
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
`

const loaderImage = css`
  height: 50px;
  width: 50px;
`

const loaderText = css`
  color: #fee801;
  font-weight: bold;
`

const loaderText_small = css`
  color: #fee801;
  font-size: 12px;
`

const version = css`
  color: #fee801;
  font-weight: 100;
  font-size: 8px;
  text-align: center;
`

const order_description = css`
  text-align: center;
`

export const render = ({ loading, order, events }) => {
  const planet_list = order.planets || events

  return (
    <div className={wrapper}>
      {loading ? (
        <div className={loader}>
          <img
            className={loaderImage}
            src="/helldivers.widget/src/images/logo.png"
          />
          <div className={loaderText}>Loading</div>
          <div className={version}>{VERSION}</div>
        </div>
      ) : (
        <div>
          {order.title || planet_list.length ? (
            <div>
              <div className={order.title ? title_main : title_main_normal}>
                <div className={title_top}>
                  {order.title
                    ? order.title
                    : events.length
                    ? "Campaign Order"
                    : null}
                </div>
                {order.title && (
                  <div className={title_bottom}>
                    <div>
                      {order.current_amount}/{order.max_amount}
                    </div>
                    <div>{order.countdown}</div>
                  </div>
                )}
              </div>
              {planet_list.length ? (
                <div>
                  {planet_list.map(planet => {
                    return (
                      <div className={planet_main} key={planet.name}>
                        <div className={planet_name}>
                          <div className={planet_name_left}>
                            {planet.event_faction === 1 && (
                              <img
                                height="15"
                                src="/helldivers.widget/src/images/terminid.png"
                              />
                            )}
                            {planet.event_faction === 2 && (
                              <img
                                height="15"
                                src="/helldivers.widget/src/images/automaton.png"
                              />
                            )}
                            {planet.name}
                          </div>
                          <div className={planet_name_right}></div>
                        </div>
                        <div className={planet_percentage}>
                          <div className={planet_percentage_number}>
                            {planet.percentage}%
                          </div>
                          <div
                            className={planet_percentage_green}
                            style={{
                              width: `${planet.percentage}%`
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className={order_description}>{order.description}</div>
              )}
            </div>
          ) : (
            <div className={loader}>
              <img
                className={loaderImage}
                src="/helldivers.widget/src/images/logo.png"
              />
              <div className={loaderText_small}>Waiting for new orders...</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
