import { Router, Request, Response } from "express";
import authorization from "../../middleware/authorization";
import User from "../../models/User";


const router = Router()

router.post("/", authorization, async (req: any, res: Response) => {
	// const id = "62c0a45f6ffc62c777c647de" --- Hardcoded id for testing purposes (comment "authorization" above)
	// const accountUpdate = user.extra[key].findById(value._id) No entiendo lo del date

	const { frequency, key, value } = req.body
	const id = req.userId
	try {
		// Check presence of user 
		const user: any = await User.findById(id)
		if (!user) return res.status(404).send(`No se encontró al usuario con id: ${req.userId}`)
		//---------------------------------

		// should frequency be monthly, simply push the entry
		if (frequency === "monthly") {
			await user.monthly[key].push(value)
			await user.save()
			console.log(user.monthly)
			return res.status(200).send(user)
		}
		//---------------------------------

		// If not, search by date (mm-yyyy) and push the entry to the object

		//---------------------------------
		//Get date from request to find in arrays or create a new object
		const dateSplit = value.date.split('-')	// Separate date into [yyyy, mm, dd]
		const targetDate = `${dateSplit[0]}-${dateSplit[1]}` //transform date into format mm-yyyy
		const foundObj = user.extra[key].filter((e: any) => e.date === targetDate) // filter extra array by target date

		if (foundObj.length === 0) {
			// Create new entry if not existing
			const newEntry = {
				date: targetDate,
				entries: [value]
			}

			await user.extra[key].push(newEntry)
			await user.save()
			return res.status(200).send(user)
		}
		//---------------------------------

		// Search index of target Date
		const targetIndex = user.extra[key].map((e: any) => e.date).indexOf(targetDate)

		await user.extra[key][targetIndex].entries.push(value)
		await user.save()
		res.status(200).send(user)

		//---------------------------------
	}
	catch (err) {
		console.log(err)
		res.status(400).send(err)
	}

});

export default router;