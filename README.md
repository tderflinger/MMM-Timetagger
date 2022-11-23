# Magic Mirror² Timetagger

This is a [`Magic Mirror²`](https://magicmirror.builders/) module that shows the latest hours tracked by [Timetagger](https://timetagger.app).
Timetagger is a time tracking application built by Almar Klein.

Specifically, it displays the following data:
- hours worked this week
- hours worked today
- currently work in progress

In order to use this module, you need to have a [`Timetagger`](https://timetagger.app) account. You can also self-host Timetagger
as described in the Timetagger documentation.

## Preview Screenshot

This is an example of how Magic Mirror² Timetagger looks in my configuration:

![Magic Mirror² GConnect exmaple screen](./doc/screenshot-MMM-GConnect.png)

## Installation

Clone this repository into your MagicMirror `modules` folder.

Example:

```
cd /home/pi/MagicMirror/modules
git clone https://github.com/tderflinger/MMM-Timetagger.git
```

Install the JavaScript dependencies:

```
cd /home/pi/MagicMirror/modules/MMM-Timetagger
npm i
```

Finally, edit your configuration file under `config/config.js` with the following configuration.
```
{	
  module: "MMM-Timetagger",
  position: "top_left",
  config: {
	  endpoint: "Your API Timetagger endpoint, like this: http://mymachine:8080/timetagger/api/v2",
	  apiToken: "Your API Token from Timetagger",
	  interval: 300000,  // data refresh interval in ms
  },
},
```

## Config Options
| **Option**        | **Description** |
| --- | --- |
| `interval`      | Interval between new fetch of data from Timetagger in ms |
| `endpoint`      | Your API Timetagger endpoint, like this: http://mymachine:8080/timetagger/api/v2 |
| `apiToken`      | Your API Token from Timetagger |

## Testing

I have tested the `Magic Mirror² Timetagger` module on an Raspberry Pi 3B with Raspberry OS
and Node 16.15.0 and `Magic Mirror²` version 2.19.0.

## Icons

The module uses the following icons from iconduck.com:

- https://iconduck.com/icons/88028/clock-time-four-outline Apache License

## References

Magic Mirror²: https://magicmirror.builders

Preact: https://preactjs.com

HTM: https://github.com/developit/htm

Axios: https://axios-http.com/

## License

MIT License