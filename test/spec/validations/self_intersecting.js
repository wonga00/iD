describe('iD.validations', function () {
    var context;

    beforeEach(function() {
        context = iD.Context();
    });

    function createInvalidWay() {
        var n1 = iD.Node({id: 'n-1', loc: [4,4]});
        var n2 = iD.Node({id: 'n-2', loc: [4,5]});
        var n3 = iD.Node({id: 'n-3', loc: [4,6]});

        var w = iD.Way({id: 'w-1', nodes: ['n-1', 'n-2', 'n-3', 'n-1']});

        context.perform(
            iD.actionAddEntity(n1),
            iD.actionAddEntity(n2),
            iD.actionAddEntity(n3),
            iD.actionAddEntity(w)
        );
    }

    it('has no errors on init', function() {
        var validator = iD.validationSelfIntersecting();
        var changes = context.history().changes();
        var issues = validator(changes, context.graph());
        expect(issues).to.have.lengthOf(0);
    });

    it('finds self intersections', function() {
        createInvalidWay();

        var validator = iD.validationSelfIntersecting();
        var changes = context.history().changes();
        var issues = validator(changes, context.graph());
        expect(issues).to.have.lengthOf(1);
        expect(issues[0].id).to.eql('self_intersecting');
        expect(issues[0].entity.id).to.eql('w-1');
    });

});
