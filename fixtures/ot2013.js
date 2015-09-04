function addFixtures(Tutor, Course, Group) {
  Course.find({}).exec(function (err, course) {
      if(course.length == 0) {
        new Course({
          _id: "inf",
          name: "Informatik"
        }).save();
        
        new Course({
          _id: "et",
          name: "Elektrotechnik"
        }).save();
        
        new Course({
          _id: "cmd",
          name: "Communication and Multimedia Design"
        }).save();
      }
  });
	Tutor.find({}).exec(function (err, tutor) {
		if(tutor.length == 0) {
			var t1 = new Tutor({
				name: "Stefan Gockel",
        email: "stefan.gockel@alumni.fh-aachen.de",
        course: "inf"
			})
      t1.save();
      
      var t2 = new Tutor({
				name: "Thomas Brüggemann",
        course: "inf"
			});
      t2.save();
      
      console.log(t2);
      
      new Group({
				name: "Die kuscheligen Koalas",
        tutors: [t1._id, t2._id]
			}).save();
      
      t1 = new Tutor({
				name: "Michelle Simon",
        email: "miminomis@gmail.com",
        course: "inf"
			});
      t1.save();
      
      t2 = new Tutor({
				name: "Felix Spriewald",
        email: "felix.spriewald@alumni.fh-aachen.de",
        course: "inf"
			});
      t2.save();
      
      new Group({
				name: "Die originellen Opossums",
        tutors: [t1._id, t2._id]
			}).save();
      
      t1 = new Tutor({
				name: "Jan Schröder",
        email: "Jan.Schroeder84@gmx.de",
        course: "et"
			});
      t1.save();
      
      t2 = new Tutor({
				name: "Robin Wetzlar",
        email: "robin.wetzlar@alumni.fh-aachen.de",
        course: "et"
			});
      t2.save();
      
      new Group({
				name: "Die waghalsigen Waschbären",
        tutors: [t1._id, t2._id]
			}).save();
      
      t1 = new Tutor({
				name: "Rebecca Winkens",
        course: "cmd"
			});
      t1.save();
      
      t2 = new Tutor({
				name: "Florian Oster",
        course: "inf"
			});
      t2.save();
      
      new Group({
				name: "Die peppigen Pinguine",
        tutors: [t1._id, t2._id]
			}).save();
      
      t1 = new Tutor({
				name: "Wolf-Christian Winkler",
        email: "wolf.winkler@me.com",
        course: "et"
			});
      t1.save();
      
      t2 = new Tutor({
				name: "Oliver Richartz",
        email: "oliver_richartz@hotmail.de",
        course: "et"
			});
      t2.save();
      
      new Group({
				name: "Die risikofreudigen Rentiere",
        tutors: [t1._id, t2._id]
			}).save();
      
      t1 = new Tutor({
				name: "Karina Nabutovskij",
        email: "karinanabutovskij@hotmail.de",
        course: "cmd"
			});
      t1.save();
      
      t2 = new Tutor({
				name: "Tobias Danisch",
        course: "inf"
			});
      t2.save();
      
      new Group({
				name: "Die fluffigen Flamingos",
        tutors: [t1._id, t2._id]
			}).save();
      
      t1 = new Tutor({
				name: "Sebastian Brückner",
        email: "se_brueckner@live.de",
        course: "cmd"
			});
      t1.save();
      
      t2 = new Tutor({
				name: "Christopher Riechers",
        email: "chris.riechers@gmx.de",
        course: "et"
			});
      t2.save();
      
      new Group({
				name: "Die keksförmigen Karpfen",
        tutors: [t1._id, t2._id]
			}).save();
      
      t1 = new Tutor({
				name: "Christoph Bresler",
        email: "bresler.chris@gmail.com",
        course: "cmd"
			});
      t1.save();
      
      t2 = new Tutor({
				name: "Ingo Raeder",
        email: "ingo12@gmx.net",
        course: "et"
			});
      t2.save();
      
      new Group({
				name: "Die dramatischen Dackel",
        tutors: [t1._id, t2._id]
			}).save();
      
      t1 = new Tutor({
				name: "Sebastian Mauer",
        email: "sebastian.mauer@alumni.fh-aachen.de",
        course: "inf"
			});
      t1.save();
      
      t2 = new Tutor({
				name: "Alexander Kubis",
        email: "alexkubis@me.com",
        course: "inf"
			});
      t2.save();
      
      new Group({
				name: "Die oszillierenden Ozelots",
        tutors: [t1._id, t2._id]
			}).save();
      
      t1 = new Tutor({
				name: "Jahush Haxa",
        email: "jahush.haxa@alumni.fh-aachen.de",
        course: "inf"
			});
      t1.save();
      
      t2 = new Tutor({
				name: "Stephan Verheyen",
        email: "stephan@verheyen.ac",
        course: "inf"
			});
      t2.save();
      
      new Group({
				name: "Die zappelnden Zitteraale",
        tutors: [t1._id, t2._id]
			}).save();
      
      t1 = new Tutor({
				name: "Tobias Klingen",
        email: "tobias.klingen@alumni.fh-aachen.de",
        course: "inf"
			});
      t1.save();
      
      t2 = new Tutor({
				name: "Simon Maier",
        email: "simon@maier-willich.de",
        course: "et"
			});
      t2.save();
      
      new Group({
				name: "Die schnellen Schildkröten",
        tutors: [t1._id, t2._id]
			}).save();
      
      t1 = new Tutor({
				name: "Dirk Bauer",
        email: "dirk-bauer@hotmail.de",
        course: "et"
			});
      t1.save();
      
      t2 = new Tutor({
				name: "Dominik Maas",
        email: "DomeMaas@gmx.de",
        course: "et"
			});
      t2.save();
      
      new Group({
				name: "Die keken Känguruhs",
        tutors: [t1._id, t2._id]
			}).save();
      
      t1 = new Tutor({
				name: "René Wolff",
        email: "rene.wolff@alumni.fh-aachen.de",
        course: "inf"
			});
      t1.save();
      
      t2 = new Tutor({
				name: "Sebastian Stolz",
        course: "inf"
			});
      t2.save();
      
      new Group({
				name: "Die netten Nasenbären",
        tutors: [t1._id, t2._id]
			}).save();
      
      t1 = new Tutor({
				name: "Maike Müller",
        email: "mueller_maike@gmx.de",
        course: "cmd"
			});
      t1.save();
      
      t2 = new Tutor({
				name: "Thomas Thiel",
        email: "thomas.thiel@alumni.fh-aachen.de",
        course: "et"
			});
      t2.save();
      
      new Group({
				name: "Die berümten Bonobos",
        tutors: [t1._id, t2._id]
			}).save();
      
      t1 = new Tutor({
				name: "Nina Leßenich",
        email: "nina.lessenich@online.de",
        course: "cmd"
			});
      t1.save();
      
      t2 = new Tutor({
				name: "Sebastian Brock",
        email: "sebastian.brock@googlemail.com",
        course: "inf"
			});
      t2.save();
      
      new Group({
				name: "Die tapferen Tucans",
        tutors: [t1._id, t2._id]
			}).save();
      
      t1 = new Tutor({
				name: "Eric Barmeyer",
        email: "eric.barmeyer@alumni.fh-aachen.de",
        course: "inf"
			});
      t1.save();
      
      t2 = new Tutor({
				name: "Michael Kühn",
        course: "inf"
			});
      t2.save();
      
      new Group({
				name: "Die klugen Krokodile",
        tutors: [t1._id, t2._id]
			}).save();
      
      t1 = new Tutor({
				name: "Jörg Laser",
        email: "laser.joerg@googlemail.com",
        course: "et"
			});
      t1.save();
      
      t2 = new Tutor({
				name: "Artjom Nering",
        email: "artjom.nering@alumni.fh-aachen.de",
        course: "et"
			});
      t2.save();
      
      new Group({
				name: "Die wundervollen Walibis",
        tutors: [t1._id, t2._id]
			}).save();
      
      t1 = new Tutor({
				name: "Franziska Seitz",
        email: "s.franzi_164@web.de",
        course: "cmd"
			});
      t1.save();
      
      t2 = new Tutor({
				name: "Johannes Dürscheid",
        email: "johannes@duerscheid.com",
        course: "et"
			});
      t2.save();
      
      new Group({
				name: "Die kantigen Kaninchen",
        tutors: [t1._id, t2._id]
			}).save();
      
      t1 = new Tutor({
				name: "Michael Döll",
        course: "cmd"
			});
      t1.save();
      
      t2 = new Tutor({
				name: "Tobias Geukens",
        email: "t.geukes@gmx.de",
        course: "et"
			});
      t2.save();
      
      new Group({
				name: "Die telegenen Tiger",
        tutors: [t1._id, t2._id]
			}).save();
      
      t1 = new Tutor({
				name: "Marc Kloep",
        email: "marc-david.kloep@alumni.fh-aachen.de",
        course: "et"
			});
      t1.save();
      
      t2 = new Tutor({
				name: "Jan Lohmann",
        course: "inf"
			});
      t2.save();
      
      new Group({
				name: "Die interaktiven Igel",
        tutors: [t1._id, t2._id]
			}).save();
		}
	});
  
}

module.exports.addFixtures = addFixtures;